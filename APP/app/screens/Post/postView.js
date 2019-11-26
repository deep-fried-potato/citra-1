import React from 'react'
import {Card, Container ,Text, Header, Content, Button,Segment, Body,} from 'native-base';
import DetailInfo from './detailInfo';
// import Media from './media.js;'
// import Comments from './comments.js'

class PostView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
        }
    }

    selectComponent = (activePage) => () => this.setState({activePage})

    _renderComponent = () => {
        let active = this.state.activePage;
        if (!!(active === 1)){
          return <DetailInfo details={this.props.post}/>
        }
      }


    render(){
        return(
        <Container>
        <Header hasSegment>
          <Body>
            <Segment>
              <Button first active = {this.state.activePage === 1} onPress ={this.selectComponent(1)}><Text>Issue</Text></Button>
              <Button active = {this.state.activePage === 2} onPress ={this.selectComponent(2)} ><Text>Media</Text></Button>
              <Button active = {this.state.activePage === 3} onPress ={this.selectComponent(3)}><Text>Status</Text></Button>
              <Button last active = {this.state.activePage === 4} onPress ={this.selectComponent(4)} ><Text>Comments</Text></Button>
            </Segment>
          </Body>
        </Header>
        <Content padder>
          <Text>{this._renderComponent()}</Text>
        </Content>
      </Container>
        )
    }
}

export default PostView;