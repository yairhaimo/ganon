import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import { SCREENS } from './index';
import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { NAVBAR } from '../definitions';
import { goToOrgScreen } from '../services/navigator';
import * as userMgr from '../services/userMgr';

export default inject('store')(
  observer(
    class UserSetup extends Component {
      render() {
        const { users } = this.props.store;
        return (
          <View>
            <Text>Which user are you?</Text>
            <FlatList
              data={users.values()}
              renderItem={({ item: user }) => (
                <TouchableOpacity onPress={() => this.setUser(user)} key={user._id}>
                  <View>
                    <Text>{user.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={goToOrgScreen}>
              <View>
                <Text>DONE</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
      setUser(user) {
        userMgr.setUser(user.toJSON());
        this.props.store.setCurrentUser(user);
      }
    }
  )
);
