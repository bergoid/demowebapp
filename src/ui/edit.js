import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import {EditForm} from "./editform.js"

const Edit = observer( ({state}) =>
{
    return h.div(
        "edit",
        [
            h.h(EditForm, {state})
        ]
    )
})

export { Edit }
