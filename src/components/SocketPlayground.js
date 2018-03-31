import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { ConnectionType } from '../constant/Constants';
import SocketSetting from '../containers/SocketSetting';
import SocketTerminal from '../containers/SocketTerminal';
import WebSocketConnection from '../helpers/WebSocketConnection';
import SocketIOConnection from '../helpers/SocketIOConnection';

const webSocket = new WebSocketConnection();
const socketIO = new SocketIOConnection();

const SocketPlayground = ({ parameters }) => {
  const currentSocket = parameters.type === ConnectionType.ws ? webSocket : socketIO;
  return (
    <Paper zDepth={3} className="padding-left-30">
      <SocketSetting webSocket={currentSocket} />
      <SocketTerminal webSocket={currentSocket} />
    </Paper>
  );
};

SocketPlayground.propTypes = {
  parameters: PropTypes.object.isRequired,
};

export default SocketPlayground;
