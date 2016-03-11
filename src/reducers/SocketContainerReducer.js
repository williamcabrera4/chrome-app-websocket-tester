import Immutable from 'immutable'
import { ConnectionType, ConnectionStatus, MessageType } from '../constant/Constants'
import { SocketContainerAction, SocketConnectionAction } from '../actions/ActionsType';
import { ConnectionFunctions, ContainerFunctions } from '../actions/ActionsFunction';

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
  }],
  index: 0
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case SocketContainerAction.CHANGE_CONNECTION_TYPE:
      return ContainerFunctions.updateConnectionType(state, action);
    case SocketContainerAction.CHANGE_HOST:
      return ContainerFunctions.updateConnectionHost(state, action);
    case SocketContainerAction.CHANGE_CHANNEL:
      return ContainerFunctions.updateConnectionChannel(state, action);
    case SocketContainerAction.UPDATE_INDEX:
      return ContainerFunctions.updatePlaygroundIndex(state, action);
    case SocketContainerAction.ADD_CONNECTION:
      return ContainerFunctions.addConnection(state, action);
    case SocketContainerAction.DELETE_TERMINAL_MESSAGES:
      return ContainerFunctions.deleteTerminalMessages(state, action);
    case SocketContainerAction.REMOVE_CONNECTION:
      return ContainerFunctions.removeConnection(state, action);

    case SocketConnectionAction.CONNECTED:
      return ConnectionFunctions.updateConnectionStatus(state, action, ConnectionStatus.CONNECTED);
    case SocketConnectionAction.DISCONNECT:
      return ConnectionFunctions.updateConnectionStatus(state, action, ConnectionStatus.DISCONNECTED);
    case SocketConnectionAction.RECEIVED:
      return ContainerFunctions.updateTerminalData(state, action);

    default:
      return defaultState
  }
}