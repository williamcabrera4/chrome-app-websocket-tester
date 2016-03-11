import Immutable from 'immutable'
import { ConnectionType, ConnectionStatus } from '../constant/Constants'

let messageIndex = 1;

const emptyState = Immutable.fromJS({
  connections: [{
    name: 'Default',
    parameters: {
      host: '',
      type: ConnectionType.ws,
      channel: ''
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

function addConnection(state, action) {
  const connectionIndex = state.get('index');
  const connectionParameters = Immutable.fromJS({
    name: action.value,
    parameters: {
      host: '',
      type: ConnectionType.ws,
      channel: ''
    },
    status: ConnectionStatus.DISCONNECTED,
    messages: []
  });
  const parameters = ['connections'];
  let newState = state.updateIn(parameters, array => array.push(connectionParameters));
  return newState.set('index', connectionIndex + 1);
}

function removeConnection(state, action) {
  const size = state.get('connections').size;
  if (size == 1) {
    return emptyState;
  }
  const connectionIndex = state.get('index');
  const parameters = ['connections'];
  if (size == connectionIndex + 1) {
    let newState = state.updateIn(parameters, array => array.remove(connectionIndex));
    return newState.set('index', connectionIndex - 1);
  }
  return state.updateIn(parameters, array => array.remove(connectionIndex));
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

function deleteTerminalMessages(state, action) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'messages'];
  return state.updateIn(parameters, array => array.clear());
}

export const ContainerFunctions = {
  updateConnectionType,
  updateConnectionHost,
  updateConnectionChannel,
  addConnection,
  removeConnection,
  updatePlaygroundIndex,
  updateTerminalData,
  deleteTerminalMessages
};

export const ConnectionFunctions = {
  updateConnectionStatus
};