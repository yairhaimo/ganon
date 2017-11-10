import { types, process } from 'mobx-state-tree';

const Teacher = types.model({
  _id: types.identifier(types.number),
  name: types.string
});

const Kid = types.model({
  _id: types.identifier(types.number),
  name: types.string
  // likes: types.array(types.reference(types.late(() => Ingredient))),
});

const Parent = types.model({
  _id: types.identifier(types.number),
  name: types.string,
  kid: types.reference(Kid),
  relation: types.union(types.literal('father'), types.literal('mother'))
});

const Message = types.model({
  _id: types.identifier(types.string),
  text: types.string,
  createdAt: types.Date,
  user: types.reference(Parent)
});

const Channel = types.model({
  _id: types.identifier(types.number),
  label: types.string,
  isReadOnly: types.boolean,
  messages: types.array(Message)
});

const RootStore = types
  .model({
    kids: types.array(Kid),
    teacher: Teacher,
    parents: types.array(Parent),
    channels: types.array(Channel),
    selectedChannel: types.maybe(types.reference(Channel))
  })
  .views(self => ({
    get numOfKids() {
      return self.kids.length;
    }
  }))
  .actions(self => ({
    sendMessage(msg) {
      self.channels[0].messages.unshift(msg);
    },
    addChannel(channel) {
      console.log('adding channel', channel);
      channel.messages = channel.messages || [];
      self.channels.push(channel);
    },
    selectChannel(channel) {
      self.selectedChannel = channel;
    }
    // createKid(id, name) {
    //   self.kids.set(id, Kid.create({ id, name: name || '', likes: [], dislikes: [] }));
    // },
    // fetchDishes: process(function*(mealType) {
    //   try {
    //     const dishes = yield API.fetchDishesByMealType();
    //     self.dishes = dishes;
    //   } catch (e) {
    //     console.log('failed loading dishes', e);
    //   }
    // })
  }));

export default RootStore.create({
  name: 'asassa',
  teacher: { _id: 1, name: 'Mrs. Teach' },
  parents: [
    { _id: 1, name: 'yair', kid: 1, relation: 'father' },
    { _id: 2, name: 'alex', kid: 1, relation: 'mother' }
  ],
  kids: [{ _id: 1, name: 'yair jr.' }],
  channels: []
  // 2: { id: 2, label: 'General', isReadOnly: false, messages: [] }
});
