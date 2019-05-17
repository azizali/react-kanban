import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import React from 'react'
import { render } from 'react-dom'
import Board from './Board'

const App = () => <Board />

render(<App />, document.querySelector('#root'))
