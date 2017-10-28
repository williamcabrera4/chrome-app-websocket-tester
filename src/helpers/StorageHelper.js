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
    StorageHelper.saveState(state);
  }

  static saveState(state) {
    // Don't save the connected status
    const newState = ConnectionFunctions.updateConnectionStatus(
      state, {},
      ConnectionStatus.DISCONNECTED,
    );
    const stateJSON = JSON.stringify(newState);
    proxyStorage.setItem(stateKey, stateJSON);
  }

  static readState(callback) {
    proxyStorage.getItem(stateKey, callback);
  }
}

export default StorageHelper;
