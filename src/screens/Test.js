import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
// import * as firebase from 'firebase';
import firebase from 'react-native-firebase';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCPUHYS-oPbFE-j1BT8zYI39_G2zN881J8',
//   authDomain: 'ganon2-97712.firebaseapp.com',
//   databaseURL: 'https://ganon2-97712.firebaseio.com',
//   projectId: 'ganon2-97712',
//   storageBucket: '',
//   messagingSenderId: '333232489553'
// };

export default inject('store')(
  observer(
    class TestScreen extends Component {
      constructor(props) {
        super(props);
        // if (!firebase.apps.length) {
        //   firebase.initializeApp(firebaseConfig);
        // }
      }
      render() {
        return (
          <View>
            <TouchableOpacity onPress={this.add}>
              <Text>Test</Text>
            </TouchableOpacity>
          </View>
        );
      }

      async add() {
        try {
          const res = await firebase
            .firestore()
            .collection('Test')
            .add({
              name: 'beep'
            });
          console.log('Document written with ID: ', res.id);
        } catch (e) {
          console.error(e);
        }
      }
    }
  )
);
