import axios from 'axios'

const service = {}
var backend = undefined
var state = undefined

// Transform records retrieved from webservice into a format used by web app
function processRecords(records)
{
    return Object.keys(records).map(
        (element, index) =>
        {
            return {
                id: element,
                name: records[element].name
            }
        }
    )
}

//
service.init = function(stateArg)
{
    state = stateArg

    backend = axios.create(
        {
            baseURL: window.location.protocol + "//" + window.location.host + process.env.PUBLIC_URL + "/api/",
            timeout: 2000
        }
    )
}

//
service.fetchRecordsList = function(whenReady)
{
    if (!backend)
    {
        console.error("Service not initialized")
        return
    }

    backend
        .get("/records")
        .then(data =>
            {
                state.indexSelected = Math.min(state.indexSelected, Object.keys(data.data).length-1)
                state.records = processRecords(data.data)
            }
        )
        .then(() =>
            {
                if (whenReady)
                    whenReady()
            }
        )
        .catch(
            err =>
            {
                console.error("An error occurred: " + err);
                return null;
            })
}

//
service.deleteRecord = function(id)
{
    if (!backend)
    {
        console.error("Service not initialized")
        return
    }

    backend
        .delete("/record/" + id)
        .then(() =>
            {
                service.fetchRecordsList()
            }
        )
        .catch(
            err =>
            {
                console.error("An error occurred: " + err);
                return null;
            })
}

//
service.putRecord = function(id, name, whenReady)
{
    if (!backend)
    {
        console.error("Service not initialized")
        return
    }

    backend
        .put("/record/" + id, { "name": name } )
        .then(() =>
            {
                service.fetchRecordsList(whenReady)
            }
        )
        .catch(
            err =>
            {
                console.error("An error occurred: " + err);
                return null;
            })
}

export { service }
