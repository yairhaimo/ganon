import { types } from 'mobx-state-tree';

export default types.model({
  _id: types.identifier(types.string),
  name: types.string
});
