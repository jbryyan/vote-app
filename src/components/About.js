import React, { Component } from 'react';
import { Grid, Button, Image, Segment, Icon, List, Container, Transition } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import '../styles/About.css';

class About extends Component {
  state = { animation: 'fade up', duration: 800, visibleProject: false, visibleAuthor: false }
  
  componentDidMount() {
    setTimeout( () => {
      this.setState({ visibleProject: true });
    }, 300);
    setTimeout( () => {
      this.setState({ visibleAuthor: true });
    }, 800);
  }

  renderProjectInfo = () => {
    return (
      <Transition.Group animation={this.state.animation} duration={this.state.duration}>
      { this.state.visibleProject && 
        <Container textAlign='center'>
          <h1>Project</h1>
          <Image src='https://i.imgur.com/xfxebKY.png' size='small' centered circular/>
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
                <List.Item><Icon name='react'/>React</List.Item>
                <List.Item><Icon name='react'/>Redux</List.Item>
                <List.Item><Icon name='react'/>Node</List.Item>
              </List> 
            </List.Item>
            <List.Item>
              Other key frameworks/packages include:<br/>
              <List bulleted horizontal size='large'>
                <List.Item><Icon name='react'/>React Router (v4)</List.Item>
                <List.Item><Icon name='react'/>React Semantic UI</List.Item>
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
            <Image src='https://i.imgur.com/xfxebKY.png' size='small' centered circular/>
            <List textAlign='center' size='large'>
              <List.Item size='huge'>
                <h1>Bryan Juarez</h1>
              </List.Item>
              <List.Item>
                <List bulleted horizontal>
                  <List.Item><Icon size='large' name='github'/></List.Item>
                  <List.Item><Icon size='large' name='linkedin'/></List.Item>
                  <List.Item><Icon size='large' name='free code camp'/></List.Item>
                </List> 
              </List.Item>
              <List.Item>
                <Icon name='marker'/>Los Angeles, CA
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
        
        <Grid.Row stretched>
          <Grid.Column width={8}>
            {this.renderProjectInfo()}
          </Grid.Column>
          <Grid.Column width={8}>
            {this.renderAuthorInfo()}
          </Grid.Column>
        </Grid.Row>
        
      </Grid>
    );
  }
}

export default About;
