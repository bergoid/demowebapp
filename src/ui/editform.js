import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { Form, FormGroup, Input, Label } from 'reactstrap';

const EditForm = observer( ({state}) =>
{
//    return h.div("hello")
    return h.h(
        Form,
        {
            id: "editForm"
        },
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
                            name: "name_IDInput",
                            id: "id_IDInput",
                            placeholder: "A unique alphanumerical ID"
                        }
                    )
                ]
            ),
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
                            placeholder: "A person's name"
                        }
                    )
                ]
            )
        ]
    )
})


export { EditForm }
