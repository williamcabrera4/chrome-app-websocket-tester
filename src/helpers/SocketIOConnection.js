import * as io from 'socket.io-client';
import { SocketConnectionAction } from '../actions/ActionsType';
import { MessageType } from '../constant/Constants';
import Helper from '../helpers/GlobalHelpers';

class SocketIOConnection {

  connect(wsUri, dispatch, channel) {
    this.websocket = io.connect(wsUri);
    this.dispatch = dispatch;
    this.channel = channel;
    this.setListeners();
  }

  send(message) {
    this.websocket.emit(this.channel, message);
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: `CLIENT: ${message}`,
      messageType: MessageType.CLIENT,
    });
  }

  setListeners() {
    this.websocket.on('connect', this.onOpen.bind(this));
    this.websocket.on('disconnect', this.onClose.bind(this));
    this.websocket.on(this.channel, this.onMessage.bind(this));
  }

  onOpen() {
    this.dispatch({
      type: SocketConnectionAction.CONNECTED,
    });
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: 'STATUS: CONNECTED',
      messageType: MessageType.STATUS,
    });
  }

  onMessage(rawMessage) {
    const message = Helper.formatMessage(rawMessage);
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: `SERVER: ${message}`,
      messageType: MessageType.SERVER,
    });
  }

  onClose() {
    this.dispatch({
      type: SocketConnectionAction.DISCONNECT,
    });
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: 'STATUS: DISCONNECTED',
      messageType: MessageType.STATUS,
    });
  }

  close() {
    this.websocket.disconnect();
  }
}

export default SocketIOConnection;
