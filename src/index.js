import { Navigation } from 'react-native-navigation';
import { registerScreens, SCREENS } from './screens';
import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
import en from '../locales/en';
import he from '../locales/he';
import { NAVBAR } from './definitions';
import rootStore from './stores';
import { retrieveChannels } from './services/api';
console.disableYellowBox = true;
I18n.fallbacks = true;
I18n.translations = {
  en,
  he
};
// I18nManager.allowRTL(I18n.locale in I18n.translations);
I18n.start = I18nManager.isRTL ? 'right' : 'left';
I18n.end = I18nManager.isRTL ? 'left' : 'right';

registerScreens();
Navigation.startSingleScreenApp({
  screen: {
    screen: SCREENS.WRAPPER,
    title: 'גן ארנבון',
    navigatorStyle: NAVBAR,
    topTabs: [
      // {
      //   screenId: SCREENS.TEST,
      //   title: 'Test'
      // },
      {
        screenId: SCREENS.MESSAGES,
        title: I18n.t('screens.messages')
      },
      {
        screenId: SCREENS.PICTURES,
        title: I18n.t('screens.pictures')
      },
      {
        screenId: SCREENS.PEOPLE,
        title: I18n.t('screens.people')
      }
    ]
  }
});
