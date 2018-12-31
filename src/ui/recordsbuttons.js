import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import {EditForm} from "./editform.js"
import { Button } from 'reactstrap';

const buttonType = "secondary"


const RecordsButtons = observer( ({state}) =>
{
    return h.div(
        "#recordsbuttons",
        [
            h.h(
                Button,
                {
                    className : "recordButton",
                    color: buttonType,
                    disabled: !state.selectionActive(),
                    onClick : () => { console.log("Delete") }
                },
                [ "Delete" ]
            ),
            h.h(
                Button,
                {
                    className : "recordButton",
                    color: buttonType,
                    onClick : () => { state.modalIsShown=true; console.log("Edit") }
                },
                [ "Edit" ]
            ),
            h.h(
                Button,
                {
                    className : "recordButton",
                    color: buttonType,
                    onClick : () => { console.log("New") }
                },
                [ "New" ]
            ),
            h.h(EditForm, {state})
        ]
    )
})


export { RecordsButtons }
