import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditForm = observer( ({state, service}) =>
{
    const modalToggle = () => { state.modal.isShown = !state.modal.isShown }
    const alertToggle = () => { state.modal.alert.isShown = !state.modal.alert.isShown }

    const formSubmit = () => {
        if (state.modal.name.length === 0)
        {
            state.modal.alert.isShown = true
            return false
        }

        service.putRecord(
            state.modal.id,
            state.modal.name,
            () => {
                state.indexSelected = state.records.findIndex(
                    (elem) => {
                        return (elem.id === state.modal.id)
                    }
                )
                console.log("indexSelected == " + state.indexSelected)
                console.log("records.length == " + state.records.length)
            }
        )

        state.modal.isShown=false

        return true
    }

    return h.h(
        Modal,
        {
            autoFocus: false,
            isOpen: state.modal.isShown,
            toggle: modalToggle
        },
        [
            h.h(
                Form,
                {
                    id: "editForm"
                },
                [
                    h.h(ModalHeader, { toggle: modalToggle }, [state.modal.title]),
                    h.h(
                        ModalBody,
                        [
                            h.h(
                                FormGroup,
                                [
                                    h.h(
                                        Label,
                                        "ID:",
                                        {
                                            for: "id_IDInput"
                                        }
                                    ),
                                    h.h(
                                        Input,
                                        {
                                            readOnly: true,
                                            name: "name_IDInput",
                                            id: "id_IDInput",
                                            placeholder: "A unique alphanumerical ID",
                                            defaultValue: state.modal.id
                                        }
                                    )
                                ]
                            ), // FormGroup "ID"
                            h.h(
                                FormGroup,
                                [
                                    h.h(
                                        Label,
                                        "Name:",
                                        {
                                            for: "id_NameInput"
                                        }
                                    ),
                                    h.h(
                                        Input,
                                        {
                                            autoFocus: true,
                                            name: "name_NameInput",
                                            id: "id_NameInput",
                                            placeholder: "A person's name",
                                            value: state.modal.name,
                                            onKeyPress: (e) => {
                                                if (e.key === 'Enter')
                                                    formSubmit()
                                            },
                                            onChange: (e) => {
                                                state.modal.name = e.target.value
                                            }
                                        }
                                    )
                                ]
                            ) // FormGroup "Name"
                        ]
                    ), // ModalBody
                    h.h(
                        ModalFooter,
                        [
                            h.h(
                                Button,
                                {
                                    color: "secondary",
                                    onClick: () => {
                                        state.modal.isShown=false
                                    }
                                },
                                ["Cancel"]
                            ),
                            h.h(
                                Button,
                                {
                                    color: "primary",
                                    onClick: formSubmit
                                },
                                ["Save"]
                            )
                        ]
                    ) // ModalFooter
                ]
            ), // Form
            h.h(Modal,
                {
                    autoFocus: false,
                    isOpen: state.modal.alert.isShown,
                    toggle: alertToggle
                },
                [
                    h.h(ModalHeader, { toggle: alertToggle }, ["Error"]),
                    h.h(ModalBody, ["The name cannot be empty"]),
                    h.h(ModalFooter,
                        [
                            h.h(
                                Button,
                                {
                                    autoFocus: true,
                                    color: "secondary",
                                    onClick: () => {
                                        state.modal.alert.isShown=false
                                    }
                                },
                                ["OK"]
                            )
                        ]
                    )
                ]
            )
        ]
    ) // Modal
})


export { EditForm }
