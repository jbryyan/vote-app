import React, { Component } from 'react';
import logo from '../styles/logo.svg';
import '../styles/Page404.css';

class Page404 extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page not found</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Page404;
