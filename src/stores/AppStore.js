import { createStore } from 'redux';
import rootReducer from '../reducers/RootReducer';

export default function makeStore() {
  return createStore(rootReducer);
}