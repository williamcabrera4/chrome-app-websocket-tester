import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { ConnectionType } from '../constant/Constants';
import Helper from '../helpers/GlobalHelpers';
import SocketSetting from './SocketSetting';
import SocketTerminal from './SocketTerminal';
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

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    parameters: currentConnection.parameters,
  };
}

export default connect(mapStateToProps)(SocketPlayground);
