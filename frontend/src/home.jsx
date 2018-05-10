import React, { Component } from 'react'
import { render } from 'react-dom';
import {BrowserRouter as Router,
        Route,
        Link,
        withRouter} from 'react-router'
import 'babel-polyfill'
import {Grid, Input, Menu , Button } from 'semantic-ui-react'
import Header from './Header.jsx'
import IndexPage from './Css.jsx'
import { StyleSheet, css } from 'aphrodite'

class Home extends React.Component {
  render() {
    return (
         <div>
            <Header title="トップページ" />
              <div className="ui inverted vertical masthead center aligned segment">
                <div id='top' className="ui text container">
                  <h1 className="ui inverted header">
                  フレンドID交換掲示板
                  </h1>
                  <_InputExampleInput />
                </div>
              </div>
            <IndexPage />
            {/*  {this.props.children}*/}
          </div>
    )
  }
}

class InputExampleInput extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
        goodstype: "",
        game: "",
        code: ""

    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleChangeGame = (e) => {
    this.setState(
      {
        game: e.target.value
      }
    )
  }

  handleChangeCode = (e) => {
    this.setState(
      {
        code: e.target.value
      }
    )
  }



  handleClick = (e) => {

    fetch('http://localhost:4000/kakikos', {
      method: 'POST',
      body: JSON.stringify({
        kakiko: {
          body: this.state.code,
          tag: this.state.game
        }
      }),
      headers: getHeaders()
    }).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json)
      //location.href = 'https://google.com/?q=' + this.state.text
    })
    //javascriptは上の処理が終わってなくても次の処理に進むので、history.pushの位置に注意
    fetch('http://localhost:4000/kakikos', {
      method: 'GET',
      headers: getHeaders()
    }).then((response) => {
      return response.json()
    }).then((response) => {
      this.props.history.push('/result')
    })
  }

  render() {
    return (
      //複数項目がある場合はdivで囲む
      <div>
      <Grid>
      <Grid.Row columns={3}>
      <Grid.Column>
      <Input placeholder='ゲーム名を入力' value={this.state.game} onChange={this.handleChangeGame} />
      </Grid.Column>
      <Grid.Column>
        <Input placeholder='フレンドIDを入力' value={this.state.code} onChange={this.handleChangeCode} />
        </Grid.Column>
        <Grid.Column>
        <Button content='Click Here' onClick={this.handleClick}/>
        </Grid.Column>
        </Grid.Row>
    </Grid>
      </div>
    )
  }
}
const _InputExampleInput = withRouter(InputExampleInput)

//ajax、backendとfrontendをつなぐために必要な５つ
const getHeaders = () => {
  return ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'access-token': localStorage['access-token'],
    'client': localStorage['client'],
    'uid': localStorage['uid']
  })
}
export default withRouter(Home)
