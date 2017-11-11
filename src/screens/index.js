import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';
import Wrapper from './Wrapper';
import MessagesScreen from './Messages';
import PeopleScreen from './People';
import PicturesScreen from './Pictures';
import ChannelScreen from './Channel';
import rootStore from '../stores';

const prefix = 'classMng';
export const SCREENS = {
  WRAPPER: `${prefix}.Wrapper`,
  MESSAGES: `${prefix}.MessagesScreen`,
  PEOPLE: `${prefix}.PeopleScreen`,
  PICTURES: `${prefix}.PicturesScreen`,
  CHANNEL: `${prefix}.ChannelScreen`
};
export function registerScreens() {
  Navigation.registerComponent(SCREENS.WRAPPER, () => Wrapper, rootStore, Provider);
  Navigation.registerComponent(SCREENS.MESSAGES, () => MessagesScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.PEOPLE, () => PeopleScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.PICTURES, () => PicturesScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.CHANNEL, () => ChannelScreen, rootStore, Provider);
}
