//import {state} from './state.js'
import axios from 'axios'

const service = {}

service.testfun = function()
{
    console.log("BEGIN testfun()")

    axios
        .get("http://192.168.236.20/api/records")
        .then(data => console.log("Fetched data: " + JSON.stringify(data.data)))
        .catch(
            err =>
            {
                console.log("An error occurred: " + err);
                return null;
            })

    console.log("END testfun()")
}

export { service }
