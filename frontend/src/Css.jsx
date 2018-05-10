import React, { Component } from 'react'
import {StyleSheet,css} from 'aphrodite'
import { Divider, Image ,Segment,Grid,Header} from 'semantic-ui-react'

const styles = StyleSheet.create({
  red: {
    color: 'rgb(153,60,124)',
  },
  blue: {
        height: '400px',
       backgroundImage: 'url(/img/smapho.png)',
       backgroundSize:'cover'
   },
  hover: {
    ':hover': {/* 類似クラス、マウスポインタが乗ったら*/
      backgroundColor: 'black',
    }
  },
  small: {
    '@media (max-width: 600px)': {/*スタイルシートの要件分岐、横幅が 600px 以下であれば */
      fontSize: '70%',
    }
  },
  card: {
    marginBottom: 50,
  },
  title: {
       fontSize: 35,
   },
   subtitle: {
        fontSize: 25,
    },
});

const InlineStyles = {
  background: "rgba(255, 255, 255, 0.7)",
  height:'400px'
}

class IndexPage extends Component {
  render() {
    return (
      <div>
        <div className={css(styles.blue)}>
            <div className = "ui center aligned segment" style={InlineStyles}> {/* InlineStylesで上に重なっているレイヤーを半透明に */}
                <div className={css(styles.red,styles.title,styles.card)}>
                フォロワーと好きなゲームのIDを交換してみよう！！
                </div>
                <Image.Group size='medium' className={css(styles.card)}>
                    <Image src={"/img/fgo.png"} />{/*}//画像のパスはindex.html中心 */}
                    <Image src={"/img/magia.png"} />
                    <Image src={"/img/dbm.png"} />
                </Image.Group>
                <div className={css(styles.small,styles.card,styles.subtitle)}>
                    ゲーム名とフレンドIDを入力してみましょう
                </div>
            </div>
       </div>
       <Grid columns='equal' style={{marginTop: '100' }}>
       <Grid.Row columns={2} >
       <Image src={"/img/fixation.png"} />

       <div style={{fontSize:50,paddingTop:100}}>こんなことしてませんか？</div>
       </Grid.Row >
       </Grid>
       <Grid style={{marginTop: '100' }} textAlign='right' class="ui right aligned grid">
       <Grid.Row columns={2}  textAlign='right'>
       <div style={{fontSize:50,paddingTop:100}}>ここでFF内の人と<br/><br/><br/>フレンドIDを交換しましょう</div>
       <Image src={"/img/FF.png"} style={{width:500,height:500}} floated='right'/>


       </Grid.Row >
       </Grid>

       <Header as='h1' size='huge' textAlign='center' style={{marginTop: '100' }}>以下、説明！</Header>

       <Header as='h1' size='huge' textAlign='center' style={{marginTop: '200' }}>その１</Header>
       <Image src={"/img/use1.png"} />
       <Header as='h1' size='huge' textAlign='center' style={{marginTop: '200' }}>その２</Header>
       <Image src={"/img/use2.png"} />
       <Header as='h1' size='huge' textAlign='center' style={{marginTop: '200' }}>その３</Header>
       <Image src={"/img/use3.png"} />

       <Header as='h1' size='huge' textAlign='center' style={{marginTop: '100' }}>説明、以上！</Header>
        <Header as='h1' size='huge' textAlign='center' style={{marginTop: '100' }}>とりあえずやってみよう！！</Header>
        <Header as='h1' size='huge' textAlign='center' style={{marginTop: '100' }}>   </Header>
     </div>
    )
  }
}

export default IndexPage
