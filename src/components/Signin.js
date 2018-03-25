import React, { Component } from 'react';
import { Grid, Form, Header, Modal, Button, Icon, Menu, Container, Label } from 'semantic-ui-react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

class Signin extends Component {

  state = { activeItem: 'login', loading: false }

  handleItemClick = (e, { name }) => {
    this.props.reset(); 
    this.setState({ activeItem: name });
  }

  loading = () => this.setState({ loading: true });

  // Renders Input field along with any errors for the register form
  renderField = (field) => {
    return(
      <Form.Field>
        <Form.Input {...field} 
          error={field.meta.submitFailed && field.meta.error ? true : false}
        />
        { field.meta.submitFailed && field.meta.error ? 
          <Label basic color='red'>{field.meta.error}</Label> : ''
        }
      </Form.Field>
    )
  };

  render() {
    const { activeItem } = this.state;
    const { handleSubmit, error, onSubmit, loading } = this.props;

    return (
      <Modal
        open={this.props.openModal}
        onClose={this.props.closeModal}
        size='mini'

      >
        <Modal.Content>
        <Menu fluid widths={2} secondary pointing>
          <Menu.Item  
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            color='teal' disabled={this.props.loading}
          >
            Log In
          </Menu.Item>
          <Menu.Item  
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
            color='red' disabled={this.props.loading}
          >
            Sign Up
          </Menu.Item>
        </Menu>
        
          <Form onSubmit={handleSubmit((values) => onSubmit(activeItem, values))}>
            <Field 
              label='Username'
              placeholder='Username'
              name='username'
              component={this.renderField}
            />
            <Field 
              label='Password'
              placeholder='Password'
              name='password'
              component={this.renderField}
            />
            
            <Grid padded centered columns={2}>
              <Grid.Row centered><strong style={{color: 'red'}}>{error}</strong></Grid.Row>
              <Grid.Row>
              <Grid.Column textAlign='center'>
              { activeItem === 'login' ? 
                <Button type='submit' basic color='teal' 
                  loading={loading} onClick={this.loading}
                >
                  Login
                </Button>
                :
                <Button type='submit' basic color='red' 
                  loading={loading} onClick={this.loading}
                >
                  Sign Up
                </Button>
              }
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

// Validates redux form.
const validate = (values) => {
  const errors = {};

  //Validate the inputs
  if (!values.username || values.username.length < 3){
    errors.username = 'Enter a username that is at least 3 characters';
  }
  if (!values.password || values.password.length < 3){
    errors.password = 'Enter a password that is at least 3 characters.';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'SigninForm'
})(Signin);

