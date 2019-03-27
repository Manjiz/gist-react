import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'

class App extends Component {
  render() {
    return (
      <Router />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
