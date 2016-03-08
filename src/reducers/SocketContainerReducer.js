import Immutable from 'immutable'
import { ConnectionType, ConnectionStatus, MessageType } from '../constant/constant'
import { SocketContainerAction, SocketConnectionAction } from '../actions/actions';

let messageIndex = 1;
const defaultState = Immutable.fromJS({
  connections: [{
    name: 'Websocket.org Echo',
    parameters: {
      host: 'ws://echo.websocket.org',
      type: ConnectionType.ws,
      channel: ''
    },
    status: ConnectionStatus.DISCONNECTED,
    messages: []
  },
    {
      name: 'Local Socket.IO',
      parameters: {
        host: 'http://localhost:3000',
        type: ConnectionType.io,
        channel: 'update'
      },
      status: ConnectionStatus.DISCONNECTED,
      messages: []
    }],
  index: 0
});

function updateConnectionType(state, action) {
  return updateConnectionParameter(state, action, 'type');
}

function updateConnectionHost(state, action) {
  return updateConnectionParameter(state, action, 'host');
}

function updateConnectionChannel(state, action) {
  return updateConnectionParameter(state, action, 'channel');
}

function updateConnectionParameter(state, action, parameter) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'parameters', parameter];
  return state.setIn(parameters, action.value);
}

function updateConnectionStatus(state, action, value) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'status'];
  return state.setIn(parameters, value);
}

function updatePlaygroundIndex(state, action) {
  return state.set('index', action.value);
}

function updateTerminalData(state, action) {
  const connectionIndex = state.get('index');
  const message = {
    key: messageIndex++,
    date: new Date(),
    message: action.value,
    type: action.messageType
  };
  const parameters = ['connections', connectionIndex, 'messages'];
  return state.updateIn(parameters, array => array.push(message));
}

export default function (state = defaultState, action) {
  switch (action.type) {

    case SocketContainerAction.CHANGE_CONNECTION_TYPE:
      return updateConnectionType(state, action);
    case SocketContainerAction.CHANGE_HOST:
      return updateConnectionHost(state, action);
    case SocketContainerAction.CHANGE_CHANNEL:
      return updateConnectionChannel(state, action);
    case SocketContainerAction.UPDATE_INDEX:
      return updatePlaygroundIndex(state, action);

    case SocketConnectionAction.CONNECTED:
      return updateConnectionStatus(state, action, ConnectionStatus.CONNECTED);
    case SocketConnectionAction.DISCONNECT:
      return updateConnectionStatus(state, action, ConnectionStatus.DISCONNECTED);
    case SocketConnectionAction.RECEIVED:
      return updateTerminalData(state, action);

    default:
      return defaultState
  }
}