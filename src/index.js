import React from 'react'
import ReactDOM from 'react-dom'

import Scanner from './components/Scanner'
import sw from './core/sw'

sw()

ReactDOM.render(<Scanner />, document.getElementById('root'))
