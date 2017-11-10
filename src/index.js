import { Navigation } from 'react-native-navigation';
import { registerScreens, SCREENS } from './screens';
import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
import en from '../locales/en';
import he from '../locales/he';

// import firebase from 'firebase';
// import 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: 'AIzaSyDwLj1ZbTV3fFgDWSdzVQlY509AQkT_tMk',
//   authDomain: 'ganon-a870d.firebaseapp.com',
//   databaseURL: 'https://ganon-a870d.firebaseio.com',
//   projectId: 'ganon-a870d',
//   storageBucket: 'ganon-a870d.appspot.com',
//   messagingSenderId: '434631193843'
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// firebase
//   .database()
//   .ref('channels')
//   .on('value', function(snapshot) {
//     rootStore
//   });
// const db = firebase.firestore();
// db
//   .collection('channels')
//   .add({
//     name: 'yaya'
//   })
//   .then(() => console.log('added'))
//   .catch(e => console.log('failed to add', e));

// db
//   .collection('channels')
//   .get()
//   .then(channels => {
//     console.log(channels.map(channel => channel.data).join(', '));
//   })
//   .catch(console.log);

I18n.fallbacks = true;
I18n.translations = {
  en,
  he
};
// I18nManager.allowRTL(I18n.locale in I18n.translations);
I18n.start = I18nManager.isRTL ? 'right' : 'left';
I18n.end = I18nManager.isRTL ? 'left' : 'right';

registerScreens();
// Navigation.startTabBasedApp({
//   tabs: [
//     {
//       screen: SCREENS.HOME,
//       label: I18n.t('screens.home'),
//       icon: require('../img/icon-up.png')
//     },
//     {
//       screen: SCREENS.PEOPLE,
//       label: I18n.t('screens.people'),
//       title: I18n.t('screens.people'),
//       icon: require('../img/icon-up.png')
//     },
//     {
//       screen: SCREENS.PICTURES,
//       label: I18n.t('screens.pictures'),
//       title: I18n.t('screens.pictures'),
//       icon: require('../img/icon-up.png')
//     }
//   ]
// });

Navigation.startSingleScreenApp({
  screen: {
    screen: SCREENS.WRAPPER,
    title: 'גן ארנבון',
    topTabs: [
      {
        screenId: SCREENS.MESSAGES,
        // icon: require('../img/icon-up.png'),
        title: I18n.t('screens.messages')
      },
      {
        screenId: SCREENS.PEOPLE,
        // icon: require('../img/icon-up.png'),
        title: I18n.t('screens.people')
      },
      {
        screenId: SCREENS.PICTURES,
        // icon: require('../img/icon-up.png'),
        title: I18n.t('screens.pictures')
      }
    ],
    appStyle: {
      tabBarBackgroundColor: '#0f2362',
      tabBarButtonColor: '#ffffff',
      tabBarSelectedButtonColor: '#63d7cc',
      tabBarTranslucent: false,
      tabFontFamily: 'Avenir-Medium' // existing font family name or asset file without extension which can be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
    }
  }
});
