import React from 'react';
import SocketSetting from './SocketSetting';
import SocketTerminal from './SocketTerminal';
import WebSocketConnection from '../helpers/WebSocketConnection'

const webSocket = new WebSocketConnection();

class SocketTestContainer extends React.Component {

  render() {
    return (
      <div>
        <SocketSetting webSocket={webSocket} />
        <SocketTerminal webSocket={webSocket} />
      </div>
    );
  }
}

export default SocketTestContainer;
