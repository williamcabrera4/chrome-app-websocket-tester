import { connect } from 'react-redux';
import Helper from '../helpers/GlobalHelpers';
import SocketPlayground from '../components/SocketPlayground';

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    parameters: currentConnection.parameters,
  };
}

export default connect(mapStateToProps)(SocketPlayground);
