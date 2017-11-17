import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { NAVBAR } from '../definitions';
import { SCREENS } from '../screens';

export function goToOrgScreen() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: SCREENS.WRAPPER,
      title: 'גן ארנבון',
      navigatorStyle: NAVBAR,
      topTabs: [
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
}

export function goToOrgSelectionScreen() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: SCREENS.USER_SETUP,
      title: 'User Setup',
      navigatorStyle: NAVBAR
    }
  });
}
