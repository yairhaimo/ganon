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
    currentUser: types.maybe(types.reference(User)),
    isLoading: types.boolean
  })
  .actions(self => ({
    async afterCreate() {
      self.isLoading = true;
      await self.retrieveChannels();
      await self.retrieveKids();
      await self.retrieveUsers();
      // self.setCurrentUser('uYe0yGD69UzJt8npAu9k');
      self.listenToMessages();
      self.isLoading = false;
    },
    retrieveChannels: flow(function*() {
      const channels = yield retrieveChannels();
      channels.forEach(channel => {
        const channelData = channel.data();
        channelData.messages = channelData.messages || {};
        self.channels.set(channel.id, channelData);
      });
    }),
    retrieveUsers: flow(function*() {
      const users = yield retrieveUsers();
      users.forEach(user => self.users.set(user.id, user.data()));
      // console.log('set users', self.users.values());
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
    setCurrentUser: flow(function*(user) {
      self.currentUser = user;
      // const users = yield retrieveUsers();
      // users.forEach(user => (self.currentUser = user.data()));
      // console.log('set currentUser', self.currentUser);
    })
  }));
