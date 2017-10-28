import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { REPOSITORY_URL } from '../constant/Constants';

class SocketPlaygroundBar extends React.Component {
  static openRepository() {
    window.open(REPOSITORY_URL);
  }

  render() {
    const codeIcon = <FlatButton label="View on Github" onClick={this.openRepository} />;
    return (
      <AppBar
        title="WebSocket Tester"
        showMenuIconButton={false}
        iconElementRight={codeIcon}
      />
    );
  }
}

export default SocketPlaygroundBar;
