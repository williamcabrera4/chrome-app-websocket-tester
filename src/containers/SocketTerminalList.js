import { connect } from 'react-redux';
import Helper from '../helpers/GlobalHelpers';
import SocketTerminalList from '../components/SocketTerminalList';

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    connectionType: currentConnection.parameters.type,
  };
}

export default connect(mapStateToProps)(SocketTerminalList);
