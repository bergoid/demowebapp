import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { ListGroup, ListGroupItem } from 'reactstrap';

const RecordsList = observer( ({state}) =>
{
    return h.h(ListGroup,
        {
            id: "recordsList"
        },
        state.records.map(
            (record, index) => h.h(
                ListGroupItem,
                {
                    className: "record",
                    tag: "button",
                    active: (index === state.indexSelected),
                    action: true,
                    onClick: () => { state.indexSelected = index }
                },
                "id: " + record.id + ", name: " + record.name
            )
        )
    )
})

export { RecordsList }
