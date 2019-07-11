import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';


class Header extends Component {

  state = { address: [] };

  render(){
    return (
      <Menu style={{ marginTop: '10px'}}>
        <div >
          <a className="item">TravauxLib</a>
        </div>

        <Menu.Menu position="right">
            <a className="item">Mes Devis</a>
            <a className="item">+</a>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
