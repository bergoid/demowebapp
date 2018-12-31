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

service.init = function(stateArg)
{
    state = stateArg

    backend = axios.create(
        {
            baseURL: "http://192.168.236.20/api/",
            timeout: 2000
        }
    )
}

service.fetchRecordsList = function()
{
    backend
        .get("/records")
        .then(data =>
            {
                state.indexSelected = Math.min(state.indexSelected, Object.keys(data.data).length-1)
                state.records = processRecords(data.data)
            }
        )
        .catch(
            err =>
            {
                console.log("An error occurred: " + err);
                return null;
            })
}

export { service }
