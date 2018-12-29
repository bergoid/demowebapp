import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { Button } from 'reactstrap';

const buttonType = "secondary"

const Buttons = observer( ({state}) =>
{
    // delete save new
    return h.div(
        "#buttons",
        [
            h.h(
                Button,
                {
                    color: buttonType
                },
                [ "Delete" ]
            ),
            h.h(
                Button,
                {
                    color: buttonType
                },
                [ "Save" ]
            ),
            h.h(
                Button,
                {
                    color: buttonType
                },
                [ "New" ]
            )
        ]
    )
})


export { Buttons }
