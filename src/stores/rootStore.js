import { types, flow } from 'mobx-state-tree';
import { retrieveChannels, retrieveUsers, retrieveKids, listenToMessages } from '../services/api';
import Kid from './kid';
// import Teacher from './teacher';
// import Parent from './parent';
import User from './user';
import Channel from './channel';

export default types
  .model({
    kids: types.map(Kid),
    // teacher: types.map(Teacher),
    // parents: types.map(Parent),
    users: types.map(User),
    channels: types.map(Channel),
    selectedChannel: types.maybe(types.reference(Channel)),
    currentUser: types.maybe(types.reference(User))
  })
  .actions(self => ({
    retrieveChannels: flow(function*() {
      const channels = yield retrieveChannels();
      channels.forEach(channel => {
        const channelData = channel.data();
        channelData.messages = channelData.messages || {};
        self.channels.set(channel.id, channelData);
      });
      console.log('set channels', self.channels.values());
    }),
    retrieveUsers: flow(function*() {
      const users = yield retrieveUsers();
      users.forEach(user => self.users.set(user.id, user.data()));
      console.log('set users', self.users.values());
    }),
    retrieveKids: flow(function*() {
      const kids = yield retrieveKids();
      kids.forEach(kid => self.kids.set(kid.id, kid.data()));
      // console.log('set kids', self.kids.values());
    }),
    listenToMessages() {
      listenToMessages(self.channels, (channel, messages) =>
        messages.forEach(message => {
          channel.addMessage(message);
        })
      );
    },
    retrieveMessagesForAllChannels() {
      console.log('retrieving messages');
      self.channels.forEach(channel => channel.retrieveMessages());
    },
    selectChannel(channel) {
      self.selectedChannel = channel;
    },
    setCurrentUser(user) {
      self.currentUser = user._id;
    }
  }));
