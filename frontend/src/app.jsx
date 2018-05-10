// React
import React, { Component } from 'react'
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  browserHistory,
  withRouter
} from 'react-router-dom'
import { hashHistory } from 'react-router'
import 'babel-polyfill'
import Result from './result.jsx'
import Home from './home.jsx'
import Friends from './friends.jsx'
// http://react.semantic-ui.com
import { Input, Menu , Button } from 'semantic-ui-react'

class LINK extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <div>
          <Route exact path ='/' component ={Home} />
          <Route path='/result' component={Result} />
          <Route path ='/friends' component ={Friends} />
        </div>
      </Router>
    )
  }
}

//index.htmlに書いてるところで表示
render(
  <LINK />,
  document.getElementById('root')
)

//export default LINK
