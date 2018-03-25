import React, { Component } from 'react';
import { Modal, Label, Header, Image, List, Form, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '../styles/VoteListModal.css';

class VoteListModal extends Component {

  state = { default: '', false: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  componentDidMount() {
    setTimeout( () => {
      this.setState({ visible: true });
    }, 100);
  }

  handleVote = (event) => {
    event.preventDefault();
    console.log('Handle vote');
    console.log(this.state.default);
    // Handle vote here. Call THUNK, add vote to db
    // After, close modal and redirect to poll results
    // Grab id from the data, pass in to load new page
    this.props.closeModal()
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <Modal size='small' open={this.props.openModal} onClose={this.props.closeModal}>
        <Modal.Header>Vote</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>{this.props.data.text}</Header>
            {!loggedIn && <Label basic color='red'>Please log in</Label> }
            <Form onSubmit={this.handleVote} id='form1'>
              <Form.Field>
                
                <Dropdown
                  selection
                  name='default'
                  options={this.props.data.options}
                  placeholder='Select a value to vote for'
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions position='left'>
          <Button basic color='black' floated='left' onClick={this.props.closeModal}> BACK TO LIST</Button>
          { loggedIn ? 
            <Button basic color='red' type='submit' form='form1'>VOTE AND SEE POLL RESULTS >></Button>
            :
            <Button basic color='red' onClick={this.props.goToResults}>SEE POLL RESULTS >></Button>
          }
        </Modal.Actions>
      </Modal>
    );
  }
}

export default VoteListModal;
