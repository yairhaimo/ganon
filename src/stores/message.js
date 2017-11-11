import { types } from 'mobx-state-tree';
import User from './user';

export default types.model({
  _id: types.identifier(types.string),
  text: types.string,
  createdAt: types.Date,
  user: types.reference(User)
});
