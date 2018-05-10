import React, { Component } from 'react'
import { Input, Menu , Button ,Card, Icon, Image,Grid} from 'semantic-ui-react'
import { render } from 'react-dom';
import {StyleSheet,css} from 'aphrodite'
import styles from './Css.jsx'
import Header from './Header.jsx'

//let count =0;こんな感じでグローバル変数を設定できる

/*
const counter = () =>{
        count = count + 1
        console.log(count)
        render()

//こんな感じでカウントすれば条件分岐に使える
}*/

class Result extends React.Component{
  constructor(props, context) {
    super(props, context)
    this.state = { activeItem: 'result', kakikos: [] }
  }

  //classの場合、メソッドの中に処理を書かなければ動かない、いきなりfetchとか書くと怒られる
  componentDidMount = () => {
    fetch('http://localhost:4000/kakikos', {
      method: 'GET',
      headers: getHeaders()
    }).then((response) => {
      return response.json()
    }).then((response) => {
      this.setState({
        kakikos: response

      })
    })
  }

  //renderで返すcomponentは単一の親→<div>で全体を返す
  render() {
    const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
    const contentsStyle = { margin: 0 }

    return (
        <div>
     {/* <div style={containerStyle}>これ使うと枠線ができる*/}
            <Header title="リザルトページ" />
                <div className="result segment">
                    <div id='result' className="result container">
                        <div style={contentsStyle}>
                        <Grid>
                            <Grid.Row columns={4} >

                            {/*この中に<div>をかくとgridがおかしくなる*/}
                            {this.state.kakikos.map((kakiko) => {
                                return (
                                        <Grid.Column style={{padding: "20px 0"}}>
                                          <Card>
                                            <Card.Content>
                                                <Image floated='left' size='tiny'src= {kakiko.image} />
                                                {/*<Card.Content>*/}
                                                <Card.Header>{kakiko.nickname}</Card.Header>
                                                <Card.Meta>{kakiko.tag}</Card.Meta>


                                                    {kakiko.body} {/*<Card.descriptionにすると画像下に書かれてしまう>*/}

                                                    {/*</Card.Content>*/}
                                                    {/*
                                                        <Card.Content extra>
                                                        <a>
                                                        <Icon name='user' />
                                                        10 Friends
                                                        </a>
                                                        </Card.Content>*/}
                                            </Card.Content>
                                          </Card>

                                    {/*<img src={kakiko.image} width="64" height="64" align="top"/>*/}
                                    {/* {kakiko.user_id}}*/}
                                        </Grid.Column>
                        )
                    })}


                    </Grid.Row>
                  </Grid>
                </div>
                </div>
              </div>
          {/*</div>*/}
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

export default Result
