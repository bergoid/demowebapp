import { Switch, Route } from 'react-router-dom'
import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"

import {Records} from './records.js'
import {Edit} from './edit.js'

const Page = observer(({ state }) =>
{
    return h.h(
        Switch,
        [
            h.h(
                Route,
                {
                    exact: true,
                    path: '/',
                    render: () => {
                        return [
                            h.h(Records, {state, key: "records"}),
                            h.h(Edit, {state, key: "edit"})
                        ]
                    }
                }
            )
        ]
    )
})

export { Page }
