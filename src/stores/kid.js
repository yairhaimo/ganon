import { types } from 'mobx-state-tree';

export default types.model({
  _id: types.identifier(types.number),
  name: types.string
});
