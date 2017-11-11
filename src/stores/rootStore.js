import { types } from 'mobx-state-tree';
import { retrieveChannels } from '../services/api';
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
    async retrieveChannels() {
      const channels = await retrieveChannels();
      channels.forEach(channel => self.addChannel(channel.data()));
    },
    addChannel(channel) {
      channel.messages = channel.messages || {};
      self.channels.set(channel._id, channel);
    },
    selectChannel(channel) {
      self.selectedChannel = channel;
    }
  }));
