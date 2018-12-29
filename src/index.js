import { BrowserRouter } from 'react-router-dom'
import * as h from 'react-hyperscript-helpers'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Page} from './ui/page.js'
import './ui/index.css'
import {state} from './state.js'

ReactDOM.render(
    h.h(BrowserRouter,
        {
            basename: process.env.PUBLIC_URL
        },
        [
            h.h(Page, { state })
        ]
    )
    ,
    document.getElementById('root')
)
