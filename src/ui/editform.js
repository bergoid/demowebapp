import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditForm = observer( ({state}) =>
{
    const modalToggle = () => { state.modalIsShown = !state.modalIsShown }

    return h.h(
        Modal,
        {
            isOpen: state.modalIsShown,
            toggle: modalToggle
        },
        [
            h.h(
                Form,
                {
                    id: "editForm"
                },
                [
                    h.h(ModalHeader, { toggle: modalToggle }, [state.modalTitle]),
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
                                            defaultValue: state.selectionActive() ? state.records[state.indexSelected].id : ""
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
                                            name: "name_NameInput",
                                            id: "id_NameInput",
                                            placeholder: "A person's name",
                                            defaultValue: state.selectionActive() ? state.records[state.indexSelected].name : ""
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
                                    onClick: () => { state.modalIsShown=false }
                                },
                                ["Cancel"]
                            ),
                            h.h(
                                Button,
                                {
                                    color: "primary",
                                    onClick: () => { state.modalIsShown=false }
                                },
                                ["Save"]
                            )
                        ]
                    ) // ModalFooter
                ]
            ) // Form
        ]
    ) // Modal
})


export { EditForm }
