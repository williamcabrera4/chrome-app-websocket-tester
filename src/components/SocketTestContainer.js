import React from 'react';
import SocketSetting from './SocketSetting';
import SocketTerminal from './SocketTerminal';

class SocketTestContainer extends React.Component {

  render() {
    return (
      <div>
        <SocketSetting />
        <SocketTerminal />
      </div>
    );
  }
}

export default SocketTestContainer;
