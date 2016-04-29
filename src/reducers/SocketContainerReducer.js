import { ConnectionStatus } from '../constant/Constants';
import { SocketContainerAction, SocketConnectionAction, StorageAction }
  from '../actions/ActionsType';
import { ConnectionFunctions, ContainerFunctions, StorageFunctions }
  from '../actions/ActionsFunction';

export default function (state = StorageFunctions.getDefaultState(), action) {
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
      return ConnectionFunctions.updateConnectionStatus(state, action,
        ConnectionStatus.DISCONNECTED);
    case SocketConnectionAction.RECEIVED:
      return ContainerFunctions.updateTerminalData(state, action);

    case StorageAction.READ_OFFLINE:
      return StorageFunctions.setOfflineState(state, action);

    default:
      return state;
  }
}
