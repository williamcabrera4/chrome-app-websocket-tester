import 'core-js/fn/object/assign';
import 'normalize.css';
import 'styles/App.scss'; // eslint-disable-line
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/Main';
import makeStore from './stores/AppStore';
import StorageHelper from './helpers/StorageHelper';
import { StorageAction } from './actions/ActionsType';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = makeStore();

const storageHelper = new StorageHelper(store);
storageHelper.init();
StorageHelper.readState((offlineState) => {
  store.dispatch({ type: StorageAction.READ_OFFLINE, value: offlineState });
});

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('app'),
);
