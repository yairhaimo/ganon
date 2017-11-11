import RootStore from './rootStore';

export default RootStore.create({
  name: 'asassa',
  teacher: { _id: 1, name: 'Mrs. Teach' },
  parents: [
    { _id: 1, name: 'yair', kid: 1, relation: 'father' },
    { _id: 2, name: 'alex', kid: 1, relation: 'mother' }
  ],
  kids: [{ _id: 1, name: 'yair jr.' }],
  channels: {}
});
