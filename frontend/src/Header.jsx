import React, { Component } from 'react'
import { render } from 'react-dom';
import {BrowserRouter as Router,
        Route,
        Link,
        withRouter} from 'react-router'
import 'babel-polyfill'
import { Input, Menu , Button } from 'semantic-ui-react'

class Header extends React.Component {//あとで<Header>タグとして使用
  constructor(props, context) {
    super(props, context)//superで継承元のpropsとcontextと取り入れる
    this.state = { activeItem: 'home', kakikos: [], loggedIn: false }
    //console.log(this.props.title)
  }

  componentDidMount = () => {
    let cookies = document.cookie.replace(' ', '').split(';')
    for (let cookie of cookies) {
      cookie = cookie.replace(' ', '').split('=')
      let key = cookie[0]
      let value = cookie[1]
      localStorage[key] = value
      document.cookie = key + "=; max-age=0"
    }

    fetch('http://localhost:4000/auth/validate_token', {
        method: 'GET',
        headers: getHeaders()
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    }).then((response) => {
        this.setState({loggedIn: response.success})
    }).catch((error) => {
        console.log(error)
        this.setState({loggedIn: false})
    })
  }

  handlehomeClick = (e) => {
    this.props.history.push('/')
  }

  handlefriendsClick = (e) => {
    this.props.history.push('/friends')
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleshowClick = (e) => {
      this.props.history.push('/result')
  }

  handlogoutClick = (e) => {
    localStorage.clear()
    this.setState({loggedIn: false})
    console.log(localStorage)
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handlehomeClick} />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleshowClick} />
          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handlefriendsClick} />
          <Menu.Menu position='right'>
            {/*<Menu.Item>
              <Input icon='search' placeholder='Search...'   />
            </Menu.Item>
            */}
          </Menu.Menu>

          <a className="ui huge primary button" href="http://localhost:4000/auth/twitter" style={{display: this.state.loggedIn ? "none" : "block"}}>
              <i className="twitter icon" />Twitterからログイン
          </a>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handlogoutClick} style={{display: this.state.loggedIn ? "block" : "none"}}/>

        </Menu>
      </div>

    )
  }
}

const getHeaders = () => {
  return ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-token': localStorage['access-token'],
    'client': localStorage['client'],
    'uid': localStorage['uid']
  })
}

export default withRouter(Header)
