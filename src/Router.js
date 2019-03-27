import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import Home from './containers/home'
import Online from './containers/online'
import Test from './containers/test'

const Router = () => {
  return (
    <HashRouter>
      <Link to="/">首页</Link>
      <span> </span>
      <Link to="/online">实时在线</Link>
      <span> </span>
      <Link to="/test">TEST</Link>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/online" component={Online} />
      <Route path="/test" component={Test} />
    </HashRouter>
  )
}

export default Router
