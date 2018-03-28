import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <div className="footer-root">
        <Menu fluid widths={3} secondary size='massive' fixed='bottom'>
          <Menu.Item>
            By Bryan Juarez | | GitHub Repository
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Footer;
