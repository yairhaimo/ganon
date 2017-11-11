import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';
import Wrapper from './Wrapper';
import MessagesScreen from './Messages';
import PeopleScreen from './People';
import PicturesScreen from './Pictures';
import ChannelScreen from './Channel';
import TestScreen from './Test';
import rootStore from '../stores';

const prefix = 'classMng';
export const SCREENS = {
  TEST: `${prefix}.Test`,
  WRAPPER: `${prefix}.Wrapper`,
  MESSAGES: `${prefix}.MessagesScreen`,
  PEOPLE: `${prefix}.PeopleScreen`,
  PICTURES: `${prefix}.PicturesScreen`,
  CHANNEL: `${prefix}.ChannelScreen`
};
export function registerScreens() {
  Navigation.registerComponent(SCREENS.TEST, () => TestScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.WRAPPER, () => Wrapper, rootStore, Provider);
  Navigation.registerComponent(SCREENS.MESSAGES, () => MessagesScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.PEOPLE, () => PeopleScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.PICTURES, () => PicturesScreen, rootStore, Provider);
  Navigation.registerComponent(SCREENS.CHANNEL, () => ChannelScreen, rootStore, Provider);
}
