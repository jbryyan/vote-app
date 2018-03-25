import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import VoteList from '../components/VoteList';
import VoteListForm from '../components/VoteListForm';
import MyPollModal from '../components/MyPollModal';
import NewVote from '../components/NewVote';

import { fetchMyPolls, sortMyPolls, deleteMyPoll, addNewPoll } from '../actions/index';

import '../styles/VoteListContainer.css';

class MyPolls extends Component {
  state = { keyword: '', sort: 'popular', 
    openModal: false, modalData: {},
    openNewVote: false
  }

  componentWillMount = () => {
    this.props.fetchMyPolls();
  }

  handleChange = (e, { name, value }) => {
    let { myPolls, sortedPolls } = this.props.polls;
    let { sort } = this.state;
    this.setState({ [name]: value });
    this.props.sortMyPolls(value, sort, myPolls, sortedPolls );
  }

  openModal = (data) => {
    console.log(data);
    this.setState({ openModal: true, modalData: data });
  }

  openNewVote = () => {
    this.setState({ openNewVote: true });
  }

  closeModal = () => {
    this.setState({ openModal: false, openNewVote: false });
  }

  goToResults = () => {
    console.log(this.state.modalData);
    this.props.history.push({
      pathname: `/poll/${this.state.modalData.id}`,
      state: { data: this.state.modalData }
    });
  }

  deletePoll = (id) => {
    console.log(id);
    
    this.props.deleteMyPoll(id)
    .then(res => {
      if(res.success){
        this.setState({ openModal: false });
      }
    })
  }

  handleNewPoll = (values) => {
    console.log('yes: ', values)
    return this.props.addNewPoll(values)
    .then(res => {
      if(res.success){
        this.setState({ openNewVote: false });
      }
    })
  }

  render() {
    const { keyword, sort, openModal, modalData, openNewVote } = this.state;
    const { user, polls } = this.props;
    return (
      <Grid>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column computer={4} tablet={3} />
          <Grid.Column computer={8} tablet={10} mobile={16}>
            <VoteListForm 
              handleChange={this.handleChange} 
              keyword={keyword} 
              sort={sort}
              addButton={true}
              openNewVote={this.openNewVote}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column widescreen={4} computer={2} tablet={1} mobile={1}/>
          <Grid.Column widescreen={8} computer={12} tablet={14} mobile={14}>
            <VoteList 
              keyword={keyword} 
              sort={sort} 
              data={polls.myPolls} 
              sortedData={polls.mySortedPolls}
              openModal={this.openModal}
              
            />
            { openModal && 
              <MyPollModal 
                openModal={openModal} 
                closeModal={this.closeModal} 
                data={modalData}
                goToResults={this.goToResults}
                deletePoll={this.deletePoll}
                isLoading={polls.loading}
              />
            }
            {(openNewVote) &&
              <NewVote 
                openModal={true} 
                closeModal={this.closeModal}
                onSubmit={this.handleNewPoll}
                isLoading={user.loading}
              />
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    polls: state.polls
  };
};

export default connect(mapStateToProps, { fetchMyPolls, sortMyPolls, deleteMyPoll, addNewPoll })(MyPolls);
