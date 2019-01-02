import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import {EditForm} from "./editform.js"
import { Button } from 'reactstrap';

const buttonType = "secondary"


const RecordsButtons = observer( ({state, service}) =>
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
                    onClick : () => { service.deleteRecord(state.records[state.indexSelected].id) }
                },
                [ "Delete" ]
            ),
            h.h(
                Button,
                {
                    className : "recordButton",
                    color: buttonType,
                    disabled: !state.selectionActive(),
                    onClick : () => {
                        state.modal.title="Edit person"
                        state.modal.id=state.records[state.indexSelected].id
                        state.modal.name=state.records[state.indexSelected].name
                        state.modal.isShown=true
                    }
                },
                [ "Edit" ]
            ),
            h.h(
                Button,
                {
                    className : "recordButton",
                    color: buttonType,
                    onClick : () => {
                        state.modal.title="New person"
                        state.modal.id=state.getUniqueID()
                        state.modal.name=""
                        state.modal.isShown=true
                    }
                },
                [ "New" ]
            ),
            h.h(EditForm, {state, service})
        ]
    )
})


export { RecordsButtons }
