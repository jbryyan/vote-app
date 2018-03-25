import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './containers/Navbar';
import Home from './containers/Home';
import About from './components/About';
import Footer from './components/Footer';
import VoteListContainer from './containers/VoteListContainer';
import VoteResults from './containers/VoteResults';
import MyPolls from './containers/MyPolls';

import './styles/App.css';

class App extends Component {
  
  render() {
    return (
      <Router basename='/vote-app'>
        <div className='app-root'>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/list' component={VoteListContainer} />
            <Route path='/mypolls' component={MyPolls} />
            <Route path='/poll/:modalData' 
              render={(props) => <VoteResults {...props} />} />
          </Switch>
          <Footer />
        </div>      
      </Router>
    );
  }
}

export default App;