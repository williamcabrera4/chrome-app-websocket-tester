import { SocketConnectionAction } from '../actions/actions';
import { MessageType } from '../constant/constant';
import getCloseReason from './WebSocketErrorMessages';
import Helper from '../helpers/GlobalHelpers';

class WebSocketConnection {

  connect(wsUri, dispatch) {
    if (!(wsUri.indexOf('ws://') == 0 || wsUri.indexOf('wss://') == 0)) {
      wsUri = `ws://${wsUri}`;
    }
    this.websocket = new WebSocket(wsUri);
    this.dispatch = dispatch;
    this.setListeners();
  }

  send(message) {
    this.websocket.send(message);
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: `CLIENT: ${message}`,
      messageType: MessageType.CLIENT
    });
  }

  setListeners() {
    this.websocket.onopen = this.onOpen.bind(this);
    this.websocket.onmessage = this.onMessage.bind(this);
    this.websocket.onclose = this.onClose.bind(this);
  }

  onOpen() {
    this.dispatch({
      type: SocketConnectionAction.CONNECTED
    });
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: 'STATUS: CONNECTED',
      messageType: MessageType.STATUS
    });
  }

  onMessage(event) {
    const message = Helper.formatMessage(event.data);
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: `SERVER: ${message}`,
      messageType: MessageType.SERVER
    });
  }

  onClose(event) {
    this.dispatch({
      type: SocketConnectionAction.DISCONNECT
    });
    this.dispatch({
      type: SocketConnectionAction.RECEIVED,
      value: 'STATUS: DISCONNECTED',
      messageType: MessageType.STATUS
    });
    if (event.code != 1005) {
      const reason = getCloseReason(event);
      this.dispatch({
        type: SocketConnectionAction.RECEIVED,
        value: `ERROR: ${reason}`,
        messageType: MessageType.ERROR
      });
    }
  }

  close() {
    this.websocket.close();
  }
}

export default WebSocketConnection;