import React, { Component } from 'react';
import { Grid, Form, Header, Modal, Button, List, Icon, Menu, Container, Label, Input } from 'semantic-ui-react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

class NewVote extends Component {

  state = { activeItem: 'login', loading: false, 
    options: [
      { text: '', value: '', votes: '0' },
      { text: '', value: '', votes: '0' }
    ]
  }

  handleItemClick = (e, { name }) => {
    this.props.reset(); 
    this.setState({ activeItem: name });
  }

  loading = () => this.setState({ loading: true });

  // Renders Input field along with any errors for the register form
  renderField = (field) => {
    return(
    
      <Form.Field key={field.key}>
        <Input 
          {...field}
        />
      </Form.Field>
      
    )
  };

  onRemove = (option) => {
    console.log('on remove: ', option);
    let options = [...this.state.options];
    options.splice(option, 1);
    this.setState({ options: options, })
  }

  addOption = () => {
    let options = this.state.options;
    this.setState({ options: [...options, { text: '', value: '', votes: '0' } ]})
  }

  render() {
    const { activeItem, options } = this.state;
    const { handleSubmit, error, onSubmit, isLoading, closeModal } = this.props;

    return (
      <Modal
        open={this.props.openModal}
        onClose={this.props.closeModal}
        
      >
        <Modal.Header>New Poll</Modal.Header>
        <Modal.Content scrolling>
          <Form id='form1' onSubmit={handleSubmit(onSubmit)}>
            <Field 
              placeholder='Question'
              name='question'
              component={this.renderField}
              icon={{ name: 'asterisk', color: 'red' }}
              iconPosition='left'
              required
              size='large'
            />
            
            { Object.keys(options).map(key => {
                const option = parseInt(key) + 1;
                return (
                  <Field 
                    placeholder={`Option ${option}`}
                    name={`option${key}`}
                    label={ key > 1 && { color:'red', onRemove: () => this.onRemove(key) }}
                    labelPosition={ key > 1 && 'right corner' }
                    icon={{ name: 'selected radio', color: 'red' }}
                    iconPosition='left'
                    component={this.renderField}
                    size='small'
                    required
                    key={key}
                  />
                )
              })
            }
            { error && <strong>{error}</strong>}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' basic type='button' floated='left' onClick={closeModal}>
            Cancel
          </Button>
          <Button color='red' basic type='button' onClick={this.addOption}>
            Option
          </Button>
          <Button color='teal' basic type='submit' form='form1' loading={isLoading}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'NewVoteForm'
})(NewVote);

