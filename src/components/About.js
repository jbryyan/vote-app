import React, { Component } from 'react';
import { Grid, Button, Image, Segment, Icon, List, Container, Transition } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import '../styles/About.css';
import reactImage from '../data/react.png';

class About extends Component {
  state = { animation: 'fade up', duration: 500, visibleProject: false, visibleAuthor: false }
  
  componentDidMount() {
    setTimeout( () => {
      this.setState({ visibleProject: true });
      this.setState({ visibleAuthor: true });
    }, 100);
    
  }

  renderProjectInfo = () => {
    return (
      <Transition.Group animation={this.state.animation} duration={this.state.duration}>
      { this.state.visibleProject && 
        <Container textAlign='center'>
          <h1>Project</h1>
          <Image src={reactImage} size='small' centered circular/>
          <List textAlign='center' divided size='huge'>
            <List.Item>
              This is a freeCodeCamp full-stack project. <br/>
              <a href='https://www.freecodecamp.org/challenges/build-a-voting-app'>
              Voting App Project Details
              </a>
            </List.Item>
            <List.Item>
              Built with:<br/>
              <List bulleted horizontal size='large'>
                <List.Item style={{color: 'teal'}}>
                  <Icon name='react' color='teal'/>
                  React
                </List.Item>
                <List.Item style={{color: 'purple'}}>
                  <Icon name='node js' color='purple'/>
                  Redux
                </List.Item>
                <List.Item style={{color: 'green'}}>
                  <Icon name='node js' color='green'/>
                  Node
                </List.Item>
              </List> 
            </List.Item>
            <List.Item>
              Other key frameworks/packages include:<br/>
              <List bulleted horizontal size='large'>
                <List.Item style={{color: 'teal'}}>
                  <Icon name='react' color='teal'/>
                  React Router (v4)
                </List.Item>
                <List.Item style={{color: 'teal'}}>
                  <Icon name='react' color='teal'/>
                  React Semantic UI
                </List.Item>
              </List> 
            </List.Item>
          </List>
        </Container>
      }
      </Transition.Group>
    );
  }

  renderAuthorInfo = () => {
  
    return (
      <Transition.Group animation={this.state.animation} duration={this.state.duration}>
        { this.state.visibleAuthor && 
          <Container textAlign='center'>
            <h1>Author</h1>
            <List textAlign='center' size='large'>
              <List.Item size='huge'>
                <h1>Bryan Juarez</h1>
              </List.Item>
              <List.Item>
                <List bulleted horizontal>
                  <List.Item><Icon size='large' name='github'/></List.Item>
                  <List.Item><Icon size='large' name='linkedin' color='blue'/></List.Item>
                  <List.Item><Icon size='large' name='free code camp' color='green'/></List.Item>
                </List> 
              </List.Item>
              <List.Item>
                <Icon name='marker' color='red'/>Los Angeles, CA
              </List.Item>
            </List>
          </Container>
        }
      </Transition.Group>

    );
  }

  render() {
    
    return (
      <Grid className='about-root' divided 
        padded stackable>
        
        <Grid.Row>
          <Grid.Column width={8}>
            {this.renderProjectInfo()}
          </Grid.Column>
          <Grid.Column width={8} only='computer tablet'>
            {this.renderAuthorInfo()}
          </Grid.Column>
        </Grid.Row>
        
      </Grid>
    );
  }
}

export default About;
