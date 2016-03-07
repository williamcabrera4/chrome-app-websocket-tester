
export const ConnectionType = {
  ws: 'websocket',
  io: 'socket.io'
};

export const ConnectionStatus = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected'
};

export const MessageType = {
  CLIENT: 'client-message',
  SERVER: 'server-message',
  ERROR: 'error-message',
  STATUS: 'status-message'
};