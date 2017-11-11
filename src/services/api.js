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

export function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export function listenToChannels() {
  return firebase
    .database()
    .ref('channels')
    .on('child_added', channel => rootStore.addChannel(channel.val()));
}

export function listenToMessages(channel) {
  setTimeout(() => {
    firebase
      .database()
      .ref(`channels/${channel._id}/messages`)
      .on('child_added', message => rootStore.addMessage(channel, message.val()));
  }, 2000);
  return () =>
    firebase
      .database()
      .ref(`channels/${channel._id}/messages`)
      .off('child_added');
}

export function sendMessage(channel, message) {
  firebase
    .database()
    .ref('channels')
    .child(channel._id)
    .child(`messages/${message._id}`)
    .set({
      ...message,
      ...{
        user: Math.random() > 0.5 ? 1 : 2 /*message.user._id*/,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      }
    });
}

// export function createChannel() {
//   const ref = firebase
//     .database()
//     .ref('channels')
//     .push();
//   ref.set({ _id: ref.key, label: 'channels.announcements', order: 1, isAdminOnly: true });
// }
