import React, { Component } from 'react';
import { Container, Dropdown, Button, Menu, Icon, Responsive } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Signin from '../components/Signin';
import NewVote from '../components/NewVote';
import { logout } from '../actions/index';
import { 
  register, login, authToken, 
  addNewPoll, fetchAllPolls 
} from '../thunks/_index';

import  { SubmissionError } from 'redux-form';

class Navbar extends Component {
  state = { 
    activeItem: 'home', 
    openSignin: false,
    openNewVote: false, 
    loading: false 
  }

  componentWillMount(){
    if(localStorage.getItem('pinCloneToken')){
      this.props.authToken(localStorage.getItem('pinCloneToken'));
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  openSignin = () => {
    this.setState({ openSignin: true });
  }

  openNewVote = () => {
    this.setState({ openNewVote: true });
  }
  
  closeModal = () => {
    this.setState({ openSignin: false, openNewVote: false, loading: false });
  }

  onSubmit = (formType, values) => {
    console.log('In onsubmit');
    console.log(formType);
    this.setState({ loading: true });
    if(formType === 'signup'){
      return this.props.register(values)
        .then(res => {
          this.setState({ loading: false });
          if(res.success){
            this.setState({ openSignin: false });
            this.props.fetchAllPolls();
          }else{
            console.log(res.message);
            throw (new SubmissionError(res.message))
          }
        })
    }else{
      return this.props.login(values)
        .then(res => {
          this.setState({ loading: false });
          if(res.success){
            this.setState({ openSignin: false });
            this.props.fetchAllPolls();
          }else{
            console.log(res.message);
            throw (new SubmissionError(res.message))
          }
      });
    }
  }

  handleNewPoll = (values) => {
    console.log('yes: ', values)
    return this.props.addNewPoll(values)
    .then(res => {
      if(res.success){
        this.setState({ openNewVote: false });
        this.props.history.push('/mypolls');
      }
    })
  }

  logout = () => {
    this.props.logout();
    this.props.fetchAllPolls();
  }

  render() {
    const activeItem = this.props.location.pathname;
    const { openSignin, loading, openNewVote } = this.state;
    const { user } = this.props;
    return (
      <div className="navbar-root">
        <Menu borderless inverted pointing fixed='top'>
          <Container>
            <Menu.Item as={Link} to='/' 
              name='home'
              active={activeItem === '/'}
              onClick={this.handleItemClick}
            >
              <Icon name='home'/>
            </Menu.Item>
            
            <Menu.Menu position='right'>
            
            <Menu.Item as={Link} to='/about'
              name='about'
              active={activeItem === '/about'}
              onClick={this.handleItemClick}
            >
              About
            </Menu.Item>
           
            <Menu.Item as={Link} to='/list' 
              name='list'
              active={activeItem === '/list'}
              onClick={this.handleItemClick} 
              
            >
              Poll List
            </Menu.Item>
            </Menu.Menu>
            
            { user.loggedIn ? 
              
              <Dropdown text='Welcome' pointing className='link item' 
                name='welcome' 
                active={activeItem === 'welcome'}
                onClick={this.handleItemClick}
              >
                <Dropdown.Menu>
                  <Dropdown.Header>{user.username}</Dropdown.Header>
                  <Dropdown.Item onClick={this.openNewVote}>Create New </Dropdown.Item>
                  <Dropdown.Item as={Link} to='/mypolls'>View My Polls</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              :
              <Menu.Item onClick={this.openSignin}>
                <Icon name='sign in'/>
              </Menu.Item>
            }
          </Container>
        </Menu>
        { openSignin &&
          <Signin 
            openModal={true} 
            closeModal={this.closeModal}
            onSubmit={this.onSubmit}
            loading={loading}
          />
        }
        {
          (openNewVote && user.loggedIn) &&
          <NewVote 
            openModal={true} 
            closeModal={this.closeModal}
            onSubmit={this.handleNewPoll}
            isLoading={user.loading}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

// Map redux actions to component props
const mapDispatchToProps = {
  register, login, 
  authToken, addNewPoll,
  logout, fetchAllPolls
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
