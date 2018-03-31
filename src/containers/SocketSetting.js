import { connect } from 'react-redux';
import Helper from '../helpers/GlobalHelpers';
import SocketSetting from '../components/SocketSetting';

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    name: currentConnection.name,
    parameters: currentConnection.parameters,
    status: currentConnection.status,
  };
}

export default connect(mapStateToProps)(SocketSetting);
