import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import {RecordsList} from "./recordslist.js"
import {RecordsButtons} from "./recordsbuttons.js"

const Records = observer( ({state}) =>
{
    return h.div(
        "#records",
        [
            h.div(
                "#recordsTitle",
                [
                    h.h2(
                        "People (" + state.records.length  +"):"
                    )
                ]
                ),
            h.h(RecordsList, {state}),
            h.h(RecordsButtons, {state})
        ]
    )
})

export { Records }
