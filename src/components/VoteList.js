import React, { Component } from 'react';
import logo from '../styles/logo.svg';
import '../styles/App.css';
import { Segment, List, Label, Image, Responsive, Transition } from 'semantic-ui-react';
import '../styles/VoteList.css';

class VoteList extends Component {
  state = { animation: 'fade up', duration: 500, visible: false }
  
  componentDidMount() {
    setTimeout( () => {
      this.setState({ visible: true });
    }, 100);
  }

  // If user is owner of poll, redirect to poll results, else open modal to vote
  listClicked = (data, owner) => {
      if(owner || this.props.voted ){
        this.props.history.push({
          pathname: `/poll/${data.id}`,
          state: { data: data }
        });
      }else{
        this.props.openModal(data);
      }
  }

  // Renders data or sorted data that is passed to it
  renderData = (data) => {
    const list = Object.keys(data)
    .map(key => 
      <List.Item key={key} 
        onClick={ () => this.listClicked(data[key], this.props.user === data[key].madeBy) }
      >
        <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
          <List.Content floated='right'>
            {'by ' + data[key].madeBy + ' | ' + data[key].date}
          </List.Content>
        </Responsive>
        <Responsive as={Image} minWidth={Responsive.onlyMobile.maxWidth}>
          <Label color='red' basic circular>{data[key].totalVotes}</Label>
          { this.props.user === data[key].madeBy ?  
            <Label color='teal' basic>My Poll</Label> 
            :
            null
          }
          { this.props.voted &&
            <Label color='orange' basic>Voted</Label> 
          }
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <List.Content color='red' circular='true' floated='right'>
            <Label color='red' circular>{data[key].totalVotes}</Label>
          </List.Content>
        </Responsive>
        <List.Content>
          <List.Header>{data[key].text}</List.Header>
        </List.Content>
      </List.Item>
    );

    return list;
  }

  render() {
    const { data, sortedData } = this.props;
    const { visible } = this.state;
    return (
      <Transition.Group animation={this.state.animation} duration={this.state.duration}>
      { visible && 
        <Segment raised className='list-segment'>
          <List divided selection size='large' relaxed verticalAlign='middle'>
            { sortedData.length === 0 ? 
              this.renderData(data) : this.renderData(sortedData)
            }
          </List>
        </Segment>
      }
      </Transition.Group>
    );
  }
}

export default VoteList;
