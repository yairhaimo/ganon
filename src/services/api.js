import rootStore from '../stores';
import firebase from 'react-native-firebase';
const orgId = 'sSA2sH9kbwIfRsoMoYqE';

firebase
  .messaging()
  .getToken()
  .then(token => console.log('token is', token));

function baseRef() {
  return firebase
    .firestore()
    .collection('orgs')
    .doc(orgId);
}

function channelsRef() {
  return baseRef().collection('channels');
}

function usersRef() {
  return baseRef().collection('users');
}

function kidsRef() {
  return baseRef().collection('kids');
}

function messagesRef(channelId) {
  return channelsRef()
    .doc(channelId)
    .collection('messages');
}

export function retrieveChannels() {
  return channelsRef().get();
}

export function retrieveMessages(channel) {
  return messagesRef(channel._id).get();
}

export function retrieveUsers() {
  return usersRef().get();
}

export function retrieveKids() {
  return kidsRef().get();
}

export function sendMessage(channel, message) {
  const ref = messagesRef(channel._id).doc();
  return ref.set({
    ...message,
    ...{
      _id: ref.id,
      user: message.user._id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
  });
}

export function listenToMessages(channels, cb) {
  channels.forEach(channel =>
    messagesRef(channel._id).onSnapshot(messages => {
      cb(channel, messages);
    })
  );
}
