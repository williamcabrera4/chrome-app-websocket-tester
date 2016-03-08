const getCurrentConnection = (state) => {
  const connections = state.get('connections');
  const currentIndex = state.get('index');
  return connections.get(currentIndex).toJS();
};

const formatMessage = (message) => {
  if (typeof message === 'object') {
    return JSON.stringify(message);
  }
  return message;
};

export default {
  getCurrentConnection: getCurrentConnection,
  formatMessage: formatMessage
};