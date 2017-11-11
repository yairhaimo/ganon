import { types } from 'mobx-state-tree';
import Parent from './parent';

export default types.model({
  _id: types.identifier(types.string),
  text: types.string,
  createdAt: types.number,
  user: types.reference(Parent)
});
