import { connect } from 'react-redux';
import Helper from '../helpers/GlobalHelpers';
import HistoryList from '../components/HistoryList';

function mapStateToProps(state) {
  const stateObject = state.socketContainerReducer.toJS();
  const currentConnection = Helper.getCurrentConnection(state.socketContainerReducer);
  return {
    connections: stateObject.connections,
    currentIndex: stateObject.index,
    status: currentConnection.status,
  };
}

export default connect(mapStateToProps)(HistoryList);
