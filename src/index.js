import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
import rootStore from './stores';
import { registerScreens } from './screens';
import en from '../locales/en';
import he from '../locales/he';
import { goToOrgSelectionScreen, goToOrgScreen } from './services/navigator';
import * as userMgr from './services/userMgr';
console.disableYellowBox = true;
I18n.fallbacks = true;
I18n.translations = {
  en,
  he
};
// I18nManager.allowRTL(I18n.locale in I18n.translations);
I18n.start = I18nManager.isRTL ? 'right' : 'left';
I18n.end = I18nManager.isRTL ? 'left' : 'right';

// userMgr.removeUser();

registerScreens();
async function init() {
  console.log('init');
  const userDefinition = await userMgr.getUser();
  await rootStore.retrieveChannels();
  await rootStore.retrieveUsers();
  rootStore.listenToMessages();
  if (!userDefinition) {
    goToOrgSelectionScreen();
  } else {
    rootStore.setCurrentUser(userDefinition);
    goToOrgScreen();
  }
}
init();
