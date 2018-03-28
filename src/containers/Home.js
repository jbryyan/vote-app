import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PageHeader from '../components/PageHeader';
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <Grid className='home-root' padded>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column computer={3} tablet={2} />
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <PageHeader />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
