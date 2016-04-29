import proxyStorage from './StorageProxy';
import { ConnectionFunctions } from '../actions/ActionsFunction';
import { ConnectionStatus } from '../constant/Constants';

const stateKey = 'state';

class StorageHelper {

  constructor(store) {
    this.store = store;
  }

  init() {
    this.store.subscribe(this.subscribeAction.bind(this));
  }

  subscribeAction() {
    const state = this.store.getState().socketContainerReducer;
    this.saveState(state);
  }

  saveState(state) {
    // Don't save the connected status
    const newState = ConnectionFunctions.updateConnectionStatus(state, {},
      ConnectionStatus.DISCONNECTED);
    const stateJSON = JSON.stringify(newState);
    proxyStorage.setItem(stateKey, stateJSON);
  }

  readState(callback) {
    proxyStorage.getItem(stateKey, callback);
  }

}

export default StorageHelper;
