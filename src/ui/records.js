import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import {RecordsTable} from "./recordstable.js"
import {RecordsButtons} from "./recordsbuttons.js"

const Records = observer( ({state, service}) =>
{
    return h.div(
        "#records",
        [
            h.h(RecordsTable, {state}),
            h.h(RecordsButtons, {state, service})
        ]
    )
})

export { Records }
