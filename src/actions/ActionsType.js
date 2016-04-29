
export const SocketContainerAction = {
  CHANGE_CONNECTION_TYPE: 'change-connection-type',
  CHANGE_HOST: 'change-host',
  CHANGE_CHANNEL: 'change-channel',
  UPDATE_INDEX: 'update-playground-index',
  ADD_CONNECTION: 'add-connection',
  DELETE_TERMINAL_MESSAGES: 'delete-terminal-messages',
  REMOVE_CONNECTION: 'remove-connection',
};

export const SocketConnectionAction = {
  CONNECTED: 'socket-connection-connected',
  DISCONNECT: 'socket-connection-disconnected',
  SEND: 'socket-connection-send',
  RECEIVED: 'socket-connection-received',
};

export const StorageAction = {
  READ_OFFLINE: 'read-offline-state',
};
