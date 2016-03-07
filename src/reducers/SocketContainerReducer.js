import Immutable from 'immutable'
import { ConnectionType } from '../constant/constant'
import { SocketContainerAction } from '../actions/actions';
import Helper from '../helpers/GlobalHelpers';

const defaultState = Immutable.fromJS({
  connections: [{
    parameters: {
      host: 'ws://echo.websocket.org',
      type: ConnectionType.ws
    },
    message: []
  }],
  index: 0
});

function updateConnectionType(state, action) {
  return updateConnectionParameter(state, action, 'type');
}

function updateConnectionHost(state, action) {
  return updateConnectionParameter(state, action, 'host');
}

function updateConnectionParameter(state, action, parameter) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'parameters', parameter];
  return state.setIn(parameters, action.value);
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SocketContainerAction.CHANGE_CONNECTION_TYPE:
      return updateConnectionType(state, action);
      break;
    case SocketContainerAction.CHANGE_HOST:
      return updateConnectionHost(state, action);
      break;
    default:
      return defaultState
  }
}