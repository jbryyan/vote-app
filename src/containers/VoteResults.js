import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Button, Header, Segment } from 'semantic-ui-react';
import Chart from 'chart.js';
import 'chart.piecelabel.js'
import '../styles/VoteResults.css';

class VoteResults extends Component {


  componentDidMount() {
    if(this.props.location.state ){
      this.renderChart();
    }
    
  }

  renderChart = () => {
    function getRandomColor() {
      var letters = '6789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    }

    var ctx = this.refs.myChart.getContext('2d');
    ctx.canvas.width= 300;
    ctx.canvas.height= 100;

    const options = this.props.location.state.data.options;

    let backgroundColor = [];

    const data = options.map( obj => {
      backgroundColor.push(getRandomColor());
      return obj.votes;
    });

    const labels = options.map( obj => {
      return obj.value;
    });

    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: backgroundColor,
            borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          mode: 'label',
          fontSize: 18,
          fontColor: '#000',
          fontStyle: 'bold',
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
        }
      }
    });
  }

  render() {
    const data = this.props.location.state ?
      this.props.location.state.data : null
      ;
    if (!data){ 
      return <div></div>
    } 
    return (
      <Grid  padded>
        <Grid.Row>
          <Grid.Column computer={4} tablet={1}/>
          <Grid.Column computer={8} tablet={14} mobile={16}>
            <Header textAlign='center' as='h1'>
              {data.text}
              <Header.Subheader>
                {`Created by ${data.madeBy} on ${data.date}`}<br/>
                Total Votes: {data.totalVotes}
              </Header.Subheader>
              <Button as={ Link }  to='/list' basic color='red'>Back to list</Button>
            </Header>
            
            <div className='vote-results-chart'>
              <canvas ref='myChart' id='myChart'></canvas>
              </div>
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default VoteResults;
