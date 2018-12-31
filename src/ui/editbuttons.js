import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { Button } from 'reactstrap';

const buttonType = "secondary"

const EditButtons = observer( ({state}) =>
{
    return h.div(
        "#editbuttons",
        [
            h.h(
                Button,
                {
                    className : "editButton",
                    color: buttonType,
                    disabled: !state.selectionActive()
                },
                [ "Cancel" ]
            ),
            h.h(
                Button,
                {
                    className : "editButton",
                    color: buttonType
                },
                [ "Save" ]
            )
        ]
    )
})


export { EditButtons }
