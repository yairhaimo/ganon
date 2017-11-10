import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';
import Wrapper from './Wrapper';
import MessagesScreen from './Messages';
import PeopleScreen from './People';
import PicturesScreen from './Pictures';
import ChannelScreen from './Channel';
import rootStore from '../stores';

import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDwLj1ZbTV3fFgDWSdzVQlY509AQkT_tMk',
  authDomain: 'ganon-a870d.firebaseapp.com',
  databaseURL: 'https://ganon-a870d.firebaseio.com',
  projectId: 'ganon-a870d',
  storageBucket: 'ganon-a870d.appspot.com',
  messagingSenderId: '434631193843'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase
//   .database()
//   .ref('channels')
//   .on('value', function(snapshot) {
//     console.log('setting name', snapshot.val());
//   });

firebase
  .database()
  .ref('channels')
  .on('child_added', function(channel) {
    console.log('channel added', channel.val().label);
    rootStore.addChannel(channel.val());
  });

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
