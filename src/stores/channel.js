import { types } from 'mobx-state-tree';
import I18n from 'react-native-i18n';
import Message from './message';

export default types
  .model({
    _id: types.identifier(types.string),
    label: types.string,
    isAdminOnly: types.boolean,
    order: types.number,
    messages: types.map(Message),
    isLoading: types.maybe(types.boolean)
  })
  .actions(self => ({
    startLoading() {
      self.isLoading = true;
    },
    stopLoading() {
      self.isLoading = false;
    },
    addMessage(message) {
      self.stopLoading();
      self.messages.set(message._id, message);
    }
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