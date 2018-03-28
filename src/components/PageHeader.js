import React, { Component } from 'react';
import { Header, Icon, Grid, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/PageHeader.css';
import image from '../data/hands.jpg';

class PageHeader extends Component {
  render() {
    return (
        <Header as='h1' icon textAlign='left' color='teal'>
          <Header.Content >
            Easy to use polls. 
            For Everyone.
            <Header.Subheader>
            Create polls at the touch of a button.
            </Header.Subheader>
            <br/>
            <Grid stackable>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <Button color='red' as={Link} to='/about' fluid>What's this about?</Button>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <Button color='teal' as={Link} to='/list' fluid>View Poll List</Button>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </Header.Content>
        </Header>
    );
  }
}

export default PageHeader;
