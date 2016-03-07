const getCurrentConnection = (state) => {
  const connections = state.get('connections');
  const currentIndex = state.get('index');
  return connections.get(currentIndex).toJS();
};

export default {
  getCurrentConnection: getCurrentConnection
};