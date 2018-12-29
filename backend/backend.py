#!/usr/bin/env python

'''
JSON web service.
Adapted from: https://gist.github.com/iaverin/f81720df9ed37a49ecee6341e4d5c0c6

Removed:
--------
Static file serving

Added:
------
Port argument, with default == 8080
"api/" prefix in route

==============================================

Simple and functional REST server for Python (3.5) using no dependencies beyond the Python standard library.
Ported from original lib for Python 2.7 by Liron (tliron @ github.com)  https://gist.github.com/tliron/8e9757180506f25e46d9
Features:
* Map URI patterns using regular expressions
* Map any/all the HTTP VERBS (GET, PUT, DELETE, POST)
* All responses and payloads are converted to/from JSON for you
* You decide the media type (text/html, application/json, etc.)
* Correct HTTP response codes and basic error messages
* Simple REST client included! use the rest_call_json() method
As an example, let's support a simple key/value store. To test from the command line using curl:
curl "http://localhost:8080/records"
curl -X PUT -d '{"name": "Tal"}' "http://localhost:8080/record/1"
curl -X PUT -d '{"name": "Shiri"}' "http://localhost:8080/record/2"
curl "http://localhost:8080/records"
curl -X DELETE "http://localhost:8080/record/2"
curl "http://localhost:8080/records"
@author: Ivan Averin
'''

import http.server
import importlib
import json
import os
import re
import shutil
import sys
import urllib.request
import urllib.parse 

# Fix issues with decoding HTTP responses
importlib.reload(sys)
# sys.setdefaultencoding('utf8')

#records = {}
# Pre-load records with some data:
records = {"1": {"name": "Simon"}, "2": {"name": "Lisa"}, "3": {"name": "Max"}}

def service_worker():
    pass

def get_records(handler):
    return records


def get_record(handler):
    key = urllib.parse.unquote(handler.path[12:])
    return records[key] if key in records else None


def set_record(handler):
    key = urllib.parse.unquote(handler.path[12:])
    payload = handler.get_payload()
    records[key] = payload
    return records[key]


def delete_record(handler):
    key = urllib.parse.unquote(handler.path[12:])
    del records[key]
    return True  # anything except None shows success


routes = {
    r'^/api/records$': {'GET': get_records, 'media_type': 'application/json'},
    r'^/api/record/': {'GET': get_record, 'PUT': set_record, 'DELETE': delete_record,
                   'media_type': 'application/json'}
    }

poll_interval = 0.1

def rest_call_json(url, payload=None, with_payload_method='PUT'):
    'REST call with JSON decoding of the response and JSON payloads'
    if payload:
        if not isinstance(payload, str):
            payload = json.dumps(payload)
        # PUT or POST
        response = urllib.request.urlopen(
            MethodRequest(url, payload.encode(), {'Content-Type': 'application/json'}, method=with_payload_method))
    else:
        # GET
        response = urllib.request.urlopen(url)
    response = response.read().decode()
    return json.loads(response)


class MethodRequest(urllib.request.Request):
    'See: https://gist.github.com/logic/2715756'

    def __init__(self, *args, **kwargs):
        if 'method' in kwargs:
            self._method = kwargs['method']
            del kwargs['method']
        else:
            self._method = None
        return urllib.request.Request.__init__(self, *args, **kwargs)

    def get_method(self, *args, **kwargs):
        return self._method if self._method is not None else urllib.request.get_method(self, *args, **kwargs)


class RESTRequestHandler(http.server.BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.routes = routes

        return http.server.BaseHTTPRequestHandler.__init__(self, *args, **kwargs)

    def do_HEAD(self):
        self.handle_method('HEAD')

    def do_GET(self):
        self.handle_method('GET')

    def do_POST(self):
        self.handle_method('POST')

    def do_PUT(self):
        self.handle_method('PUT')

    def do_DELETE(self):
        self.handle_method('DELETE')

    def get_payload(self):
        payload_len = int(self.headers.get('content-length', 0))
        payload = self.rfile.read(payload_len)
        payload = json.loads(payload.decode())
        return payload

    def handle_method(self, method):
        route = self.get_route()
        if route is None:
            self.send_response(404)
            self.end_headers()
            self.wfile.write('Route not found\n'.encode())
        else:
            if method == 'HEAD':
                self.send_response(200)
                if 'media_type' in route:
                    self.send_header('Content-type', route['media_type'])
                self.end_headers()
            else:
                if method in route:
                    content = route[method](self)
                    if content is not None:
                        self.send_response(200)
                        if 'media_type' in route:
                            self.send_header('Content-type', route['media_type'])
                        self.end_headers()
                        if method != 'DELETE':
                            self.wfile.write(json.dumps(content).encode())
                    else:
                        self.send_response(404)
                        self.end_headers()
                        self.wfile.write('Not found\n'.encode())
                else:
                    self.send_response(405)
                    self.end_headers()
                    self.wfile.write((method + ' is not supported\n').encode())

    def get_route(self):
        for path, route in self.routes.items():
            if re.match(path, self.path):
                return route
        return None


def rest_server(port):
    'Starts the REST server'
    http_server = http.server.HTTPServer(('', port), RESTRequestHandler)
    http_server.service_actions = service_worker
    print('Starting HTTP server at port %d' % port)
    try:
        http_server.serve_forever(poll_interval)
    except KeyboardInterrupt:
        pass
    print('Stopping HTTP server')
    http_server.server_close()


def main(argv):
    portNumber = 8080
    if len(argv) > 0:
        if (argv[0] == '--help'):
            print('TODO : help')
            return
        else:
            portNumber = int(argv[0])
    rest_server(portNumber)


if __name__ == '__main__':
    main(sys.argv[1:])
