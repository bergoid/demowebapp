import { Switch, Route } from 'react-router-dom'
import * as h from 'react-hyperscript-helpers'
import {observer} from "mobx-react"
//import lifecycle from 'react-pure-lifecycle'
import { lifecycle } from 'recompose'

import {Records} from './records.js'
import {Edit} from './edit.js'
import {service} from '../service.js'

//const pageMethods = {
//    componentDidMount(props)
//    {
//        console.log('I mounted! Here are my props: ', props);
//    }
//};

const Page = lifecycle(

{
    componentDidMount(props)
    {
        service.testfun()
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
                            h.h(Records, {state, key: "records"}),
                            h.h(Edit, {state, key: "edit"})
                        ]
                    }
                }
            )
        ]
    )
}
))

export { Page }
