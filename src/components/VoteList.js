import React, { Component } from 'react';
import logo from '../styles/logo.svg';
import '../styles/App.css';
import { Segment, List, Label, Image, Responsive, Transition, Icon } from 'semantic-ui-react';
import '../styles/VoteList.css';
import Loading from './Loading';

class VoteList extends Component {
  state = { animation: 'fade up', duration: 500, visible: false }
  
  componentDidMount() {
    console.log('component did mount');
    setTimeout( () => {
      this.setState({ visible: true });
    }, 100);
  }

  // If user is owner of poll, redirect to poll results, else open modal to vote
  listClicked = (data, owner) => {
      if(owner || data.voted ){
        this.props.history.push({
          pathname: `/poll/${data._id}`,
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
          { data[key].voted &&
            <Label color='green' basic>
              <Icon name='check'/>
              Voted
            </Label> 
          }
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <List.Content color='red' circular='true' floated='right'>
            { this.props.user === data[key].madeBy ?  
              <Label color='teal' basic>My Poll</Label> 
              :
              null
            }
            { data[key].voted &&
              <Label color='green' basic>
                <Icon name='check'/>
                Voted
              </Label> 
            }
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
    const { data, sortedData, loading } = this.props;
    const { visible } = this.state;

    if(loading) return <Loading />;

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
