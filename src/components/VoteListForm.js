import React, { Component } from 'react';
import logo from '../styles/logo.svg';
import '../styles/App.css';
import { Form, Grid, Container, Divider, Button, Icon, Input, Select } from 'semantic-ui-react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

class VoteListForm extends Component {

  render() {
    const { handleChange } = this.props;
    const { keyword, sort, addButton, openNewVote } = this.props;
    const options = [
      { key: 'p', text: 'most popular', value: 'popular' },
      { key: 'r', text: 'most recent', value: 'recent' },
    ]
    return (
      <Container>
        <Form className='login-form'>
          <Form.Group widths='equal' >
            <Form.Field 
              control={Input} 
              label='Search' 
              fluid 
              name='keyword' 
              placeholder='Enter a keyword'
              value={keyword} onChange={handleChange}
            /> 
            <Form.Field 
              control={Select} 
              label='Sort by' 
              fluid 
              name='sort' 
              options={options}
              value={sort} 
              onChange={handleChange}
            /> 
          </Form.Group>
  
        </Form> {/*--End Form--*/}
        { addButton && <Button color='teal' onClick={openNewVote}>Create New Poll</Button> } 
      </Container>
    );
  }
}



export default VoteListForm;

