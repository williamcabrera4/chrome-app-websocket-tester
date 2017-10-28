import 'core-js/fn/object/assign';
import 'normalize.css';
import 'styles/App.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/Main';
import makeStore from './stores/AppStore';
import StoreHelper from './helpers/StorageHelper';
import { StorageAction } from './actions/ActionsType';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = makeStore();

const storeHelper = new StoreHelper(store);
storeHelper.init();
storeHelper.readState((offlineState) => {
  store.dispatch({ type: StorageAction.READ_OFFLINE, value: offlineState });
});

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'),
);
