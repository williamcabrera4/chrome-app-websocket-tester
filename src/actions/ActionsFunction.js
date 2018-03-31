import Immutable from 'immutable';
import { ConnectionType, ConnectionStatus } from '../constant/Constants';
import Helper from '../helpers/GlobalHelpers';

const defaultState = Immutable.fromJS({
  connections: [{
    name: 'Websocket.org Echo',
    parameters: {
      host: 'ws://echo.websocket.org',
      type: ConnectionType.ws,
      channel: '',
    },
    status: ConnectionStatus.DISCONNECTED,
    messages: [],
  }],
  index: 0,
});

const emptyState = Immutable.fromJS({
  connections: [{
    name: 'Default',
    parameters: {
      host: '',
      type: ConnectionType.ws,
      channel: '',
    },
    status: ConnectionStatus.DISCONNECTED,
    messages: [],
  }],
  index: 0,
});

function updateConnectionParameter(state, action, parameter) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'parameters', parameter];
  return state.setIn(parameters, action.value);
}

function updateConnectionType(state, action) {
  return updateConnectionParameter(state, action, 'type');
}

function updateConnectionHost(state, action) {
  return updateConnectionParameter(state, action, 'host');
}

function updateConnectionChannel(state, action) {
  return updateConnectionParameter(state, action, 'channel');
}

function updateConnectionStatus(state, action, value) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'status'];
  return state.setIn(parameters, value);
}

function addConnection(state, action) {
  const connectionParameters = Immutable.fromJS({
    name: action.value,
    parameters: {
      host: '',
      type: ConnectionType.ws,
      channel: '',
    },
    status: ConnectionStatus.DISCONNECTED,
    messages: [],
  });
  const parameters = ['connections'];
  let newState = state.updateIn(parameters, array => array.push(connectionParameters));
  const currentConnection = Helper.getCurrentConnection(state);
  if (currentConnection.status === ConnectionStatus.DISCONNECTED) {
    newState = newState.set('index', state.get('connections').size);
  }
  return newState;
}

function removeConnection(state) {
  const { size } = state.get('connections');
  if (size === 1) {
    return emptyState;
  }
  const connectionIndex = state.get('index');
  const parameters = ['connections'];
  if (size === connectionIndex + 1) {
    const newState = state.updateIn(parameters, array => array.remove(connectionIndex));
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
    key: new Date().getTime(),
    date: new Date(),
    message: action.value,
    type: action.messageType,
  };
  const parameters = ['connections', connectionIndex, 'messages'];
  return state.updateIn(parameters, array => array.push(message));
}

function deleteTerminalMessages(state) {
  const connectionIndex = state.get('index');
  const parameters = ['connections', connectionIndex, 'messages'];
  return state.updateIn(parameters, array => array.clear());
}

function setOfflineState(state, action) {
  if (typeof action.value === 'undefined' || action.value === null) {
    return defaultState;
  }
  return Immutable.fromJS(action.value);
}

function getDefaultState() {
  return defaultState;
}

export const ContainerFunctions = {
  updateConnectionType,
  updateConnectionHost,
  updateConnectionChannel,
  addConnection,
  removeConnection,
  updatePlaygroundIndex,
  updateTerminalData,
  deleteTerminalMessages,
};

export const ConnectionFunctions = {
  updateConnectionStatus,
};

export const StorageFunctions = {
  setOfflineState,
  getDefaultState,
};
