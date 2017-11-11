import { types } from 'mobx-state-tree';
import Kid from './kid';

export default types.model({
  _id: types.identifier(types.string),
  name: types.string,
  isAdmin: types.boolean,
  kid: types.maybe(types.reference(Kid))
});
