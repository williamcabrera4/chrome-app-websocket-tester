import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/lib/paper';
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
  parameters: React.PropTypes.object,
};

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    parameters: currentConnection.parameters,
  };
}

export default connect(mapStateToProps)(SocketPlayground);
