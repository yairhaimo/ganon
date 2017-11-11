import { types } from 'mobx-state-tree';
import { sendMessage } from '../services/api';
import Kid from './kid';
import Teacher from './teacher';
import Parent from './parent';
import Channel from './channel';

export default types
  .model({
    kids: types.array(Kid),
    teacher: Teacher,
    parents: types.array(Parent),
    channels: types.map(Channel),
    selectedChannel: types.maybe(types.reference(Channel))
  })
  .actions(self => ({
    sendMessage(channelId, message) {
      sendMessage(channelId, message);
    },
    addMessage(channel, message) {
      channel.addMessage(message);
    },
    addChannel(channel) {
      channel.messages = channel.messages || {};
      self.channels.set(channel._id, channel);
    },
    selectChannel(channel) {
      self.selectedChannel = channel;
    }
  }));
