import { connect } from 'react-redux';
import Helper from '../helpers/GlobalHelpers';
import SocketTerminal from '../components/SocketTerminal';

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    terminalData: currentConnection.messages,
    status: currentConnection.status,
    parameters: currentConnection.parameters,
  };
}

export default connect(mapStateToProps)(SocketTerminal);
