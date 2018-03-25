import React, { Component } from 'react';
import { Header, Icon, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/PageHeader.css';

class PageHeader extends Component {
  render() {
    return (
        <Header block as='h1' icon textAlign='left'>
          <Header.Content>
            Easy to use polls. 
            For Everyone.
            <Header.Subheader>
            Make a poll, then watch realtime results.
            <br/>Create public or private polls at the touch of a button.
            </Header.Subheader>
            <br/>
            <Grid stackable>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <Button fluid>Get started >> </Button>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <Button as={Link} to='/list' fluid>View Poll List</Button>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </Header.Content>
        </Header>
    );
  }
}

export default PageHeader;
