import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { Table } from 'reactstrap';

const RecordsTable = observer( ({state}) =>
{
    return h.h(Table,
    {
        id: "recordsTable",
        hover: true
    },
    [
        h.thead(
            [
            h.tr(
            [
                h.th(["ID"]),
                h.th(["Name"])
            ]
            )
            ]
        ),
        h.tbody(
            state.records.map(
                (record, index) =>
                    h.tr(
                    {
                        id: (index === state.indexSelected) ? "rowSelected" : "",
                        onClick: () => { state.indexSelected = index }
                    },
                    [
                        h.td(record.id),
                        h.td(record.name)
                    ]
                    )
            )
        )
    ]
    )
})

export { RecordsTable }
