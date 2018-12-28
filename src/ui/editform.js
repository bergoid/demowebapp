import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"

const EditForm = observer( ({state}) =>
{
    return h.div("editform")
})


export { EditForm }
