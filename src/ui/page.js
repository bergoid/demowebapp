import { Switch, Route } from 'react-router-dom'
import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
import { lifecycle } from 'recompose'

import {Records} from './records.js'
import {service} from '../service.js'

const Page = lifecycle(

{
    componentDidMount()
    {
        service.init(this.props.state)
        service.fetchRecordsList()

        setInterval(
            () =>
            {
                service.fetchRecordsList()
            },
            6000
        )
    }
}

)(observer(

({ state }) =>
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
                            h.h(Records, {state, key: "records"})
                        ]
                    }
                }
            )
        ]
    )
}
))

export { Page }
