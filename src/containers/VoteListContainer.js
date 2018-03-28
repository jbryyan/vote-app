import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import VoteList from '../components/VoteList';
import VoteListForm from '../components/VoteListForm';
import VoteListModal from '../components/VoteListModal';
import { fetchAllPolls, sortMyPolls, voteForPoll } from '../thunks/_index';

import '../styles/VoteListContainer.css';

class VoteListContainer extends Component {

  state = { keyword: '', sort: 'popular', 
    data: 
    [
      { 
        id: '12', totalVotes: '60', text: 'Best burgers in the west', 
        options:
        [
          { text: 'June', value: 'June', votes: '12' },
          { text: 'March', value: 'March', votes: '1' },
          { text: 'Sept', value: 'Sept', votes: '12' },
          { text: 'July', value: 'July', votes: '13' },
          { text: 'August', value: 'August', votes: '22' }
        ], 
        madeBy: 'june', date: '11/12/18' 
      } 
    ],
    sortedData: [], openModal: false,
    modalData: {}
  }

  componentDidMount = () => {
    
    this.props.fetchAllPolls();
   
  }

  handleChange = (e, { name, value }) => {
    /*
    const copyData = this.state.data[0].text.toLowerCase();
    const copySorted = this.state.sortedData[0];
    let newSortedData = [];
    let newData = [];
    this.setState({ [name]: value });
    */
    let { myPolls, sortedPolls } = this.props.polls;
    let { sort } = this.state;
    this.setState({ [name]: value });
    this.props.sortMyPolls(value, sort, myPolls, sortedPolls );
    
  }

  openModal = (data) => {
    console.log(data);
    this.setState({ openModal: true, modalData: data });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  }

  handleVote = (id, option) => {
    console.log(id, option);
    this.props.voteForPoll(id, option)
    .then(res => {
      if (res.success){
        this.goToResults();
      }
    })
    .catch(err => {
      this.setState({ openModal: false });
    })
  }

  goToResults = () => {
    console.log('modal data', this.state.modalData);
    this.props.history.push({
      pathname: `/poll/${this.state.modalData._id}`,
      state: { data: this.state.modalData }
    });
  }

  render() {
    const { keyword, sort, data, sortedData, openModal, modalData } = this.state;
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
              user={user.username}
              history={this.props.history}
              loading={polls.loading}
            />
            { openModal && 
              <VoteListModal 
                openModal={openModal} 
                closeModal={this.closeModal} 
                data={modalData}
                goToResults={this.goToResults}
                handleVote={this.handleVote}
                loggedIn={user.loggedIn}
                loading={user.loading}
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

export default connect(mapStateToProps, { fetchAllPolls, sortMyPolls, voteForPoll })(VoteListContainer);
