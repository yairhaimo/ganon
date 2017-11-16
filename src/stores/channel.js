import { types, flow } from 'mobx-state-tree';
import I18n from 'react-native-i18n';
import Message from './message';
import { retrieveMessages, sendMessage } from '../services/api';

export default types
  .model({
    _id: types.identifier(types.string),
    label: types.string,
    isAdminOnly: types.boolean,
    order: types.number,
    messages: types.maybe(types.map(Message)),
    isLoading: types.maybe(types.boolean)
  })
  .actions(self => ({
    startLoading() {
      self.isLoading = true;
    },
    stopLoading() {
      self.isLoading = false;
    },
    sendMessage(message) {
      sendMessage(self, message);
    },
    addMessage(message) {
      const msg = message.data();
      // for optimistic UX
      msg.createdAt = msg.createdAt || Date.now();
      self.messages.set(message.id, msg);
    },
    retrieveMessages: flow(function*() {
      const messages = yield retrieveMessages(self);
      console.log('got messages', messages);
      messages.forEach(message => self.addMessage(message));
    })
  }))
  .views(self => ({
    get sortedMessages() {
      return self.messages.values().sort((a, b) => b.createdAt - a.createdAt);
    },
    get lastMessage() {
      return self.sortedMessages && self.sortedMessages.length && self.sortedMessages[0];
    },
    get formattedLastMessage() {
      return self.lastMessage
        ? `${self.lastMessage.user.name}: ${self.lastMessage.text}`
        : I18n.t('channels.defaultMessage');
    }
  }));
