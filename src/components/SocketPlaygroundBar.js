import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import { REPOSITORY_URL } from '../constant/constant'

class SocketPlaygroundBar extends React.Component {

  openRepository() {
    window.open(REPOSITORY_URL);
  }

  render() {
    const codeIcon = <FlatButton label="View on Github" onClick={this.openRepository}/>;
    return (
      <AppBar title="WebSocket Tester"
              showMenuIconButton={false}
              iconElementRight={codeIcon}
      />
    );
  }
}

export default SocketPlaygroundBar;
