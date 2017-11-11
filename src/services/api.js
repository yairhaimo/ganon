import rootStore from '../stores';
import firebase from 'react-native-firebase';
const kintergardenId = 'nzKP3vyMoSzOlzkh8PBr';

export function retrieveChannels() {
  return firebase
    .firestore()
    .collection('channels')
    .where('kintergardenId', '==', kintergardenId)
    .get();
}

export function retrieveMessages(channel) {
  return firebase
    .firestore()
    .collection('messages')
    .where('channelId', '==', channel._id)
    .get();
}

export function sendMessage(channel, message) {
  const ref = firebase
    .firestore()
    .collection('messages')
    .doc();
  return ref.set({
    ...message,
    ...{
      _id: ref.id,
      user: message.user._id,
      channelId: channel._id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
  });
}
