import React, { Component } from 'react';
import { Modal, Label, Header, Image, List, Form, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '../styles/VoteListModal.css';

class MyPollModal extends Component {

  state = { visible: false, openModal: false}

  componentDidMount() {
    setTimeout( () => {
      this.setState({ visible: true });
    }, 100);
  }

  deletePollVerify = (value) => this.setState({ openModal: value });

  render() {
    const { data, deletePoll, isLoading } = this.props;

    return (
      <Modal size='small' open={this.props.openModal} onClose={this.props.closeModal}>
        <Modal.Header>My Poll</Modal.Header>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Modal.Description>
        
            <Header as='h2'>{this.props.data.text}</Header>
            <List>
              <List.Item>{`Total Votes: ${data.totalVotes}`}</List.Item>
              <List.Item>
                Options
              </List.Item>
            </List>
            <List bulleted horizontal>
            { Object.keys(data.options).map(key => {
                return(
                  <List.Item key={key}>{data.options[key].text}</List.Item>
                ) 
              })
            }
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions position='left'>
          <Button basic color='black' floated='left' onClick={this.props.closeModal}> BACK TO LIST</Button>
          <Button basic color='red' onClick={() => this.deletePollVerify(true)} >DELETE POLL</Button>
          <Button basic color='teal' onClick={this.props.goToResults}>POLL RESULTS >></Button>
          
        </Modal.Actions>
        <Modal size='mini' open={this.state.openModal}>
            <Modal.Content>
              Are you sure you want to delete the poll?
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.deletePollVerify(false)}>Cancel</Button>
              <Button onClick={() => deletePoll(data.id)}
                loading={isLoading}
              >
                Delete
              </Button>
            </Modal.Actions>
        </Modal>
      </Modal>
    );
  }
}

export default MyPollModal;
