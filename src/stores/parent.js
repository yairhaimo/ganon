import { types } from 'mobx-state-tree';
import Kid from './kid';

export default types.model({
  _id: types.identifier(types.number),
  name: types.string,
  kid: types.reference(Kid),
  relation: types.union(types.literal('father'), types.literal('mother'))
});
