import React, { Component } from 'react'
import { Input, Menu , Button ,Grid,Card} from 'semantic-ui-react'
import { render } from 'react-dom';
import Header from './Header.jsx'

class Friends extends React.Component{
  constructor(props, context) {
    super(props, context)
    this.state = { activeItem: 'friends', kakikos: [] }
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
      console.log(this.state.kakikos)
    })
  }

  //renderで返すcomponentは単一の親→<div>で全体を返す
  render() {
    const containerStyle = { border: '1px gray solid', display: 'inline-block', padding: 10 }
    const contentsStyle = { margin: 0 }
    var tmp =[]
    return (
        <div>
            <Header title="フレンドページ" />
              <div className="friends segment">
                <div id='friends' className="friends container">
                <Grid>
                    <Grid.Row columns={4} >

                    {/*この中に<div>をかくとgridがおかしくなる*/}
                    {this.state.kakikos.map((kakiko) => {
                        console.log(kakiko.user_id)
                        if (tmp.indexOf(kakiko.user_id) == -1)
                            {tmp.push(kakiko.user_id)
                            return (

                                    <Grid.Column style={{padding: "20px 0"}}>
                                      <Card>
                                        <Card.Content style={{display:'flex'}}>
                                        <img src={kakiko.image} width="80" height="80" align="top"/>
                                            <Card.Header style={{display:'flex',justifyContent: 'center'}}>
                                                {kakiko.nickname}
                                            </Card.Header>
                                            
                                        </Card.Content>
                                      </Card>

                                {/*<img src={kakiko.image} width="64" height="64" align="top"/>*/}
                                {/* {kakiko.user_id}}*/}
                                    </Grid.Column>
                    )
                }
            })}


            </Grid.Row>
          </Grid>
                </div>
              </div>
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

export default Friends
