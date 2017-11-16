import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import I18n from 'react-native-i18n';
import ChatRow from '../components/ChatRow';
import { SCREENS } from './index';

export default inject('store')(
  observer(
    class MessagesScreen extends Component {
      static navigatorStyle = {
        navBarHidden: true
      };
      async componentDidMount() {
        // const store = this.props.store;
        // console.log('retrieving channels');
        // await store.retrieveChannels();
        // console.log('retrieving messages for all channels');
        // store.retrieveMessagesForAllChannels();
        // store.listenToMessages();
      }
      render() {
        const {
          isLoading,
          channels,
          isLoadingChannels,
          users,
          setCurrentUser,
          currentUser
        } = this.props.store;
        if (!isLoading) {
          return <Text>Loading</Text>;
        }
        return (
          <View style={styles.container}>
            <View>
              <Text>Which user are you?</Text>
              <FlatList
                data={users.values()}
                renderItem={({ item: user }) => (
                  <TouchableOpacity onPress={() => setCurrentUser(user)} key={user._id}>
                    <View>
                      <Text>{user.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            {currentUser && (
              <View>
                <Text>Current user is {currentUser.name}</Text>
              </View>
            )}
            <FlatList
              data={channels.values()}
              renderItem={({ item: channel }) => (
                <ChatRow
                  key={channel._id}
                  item={channel}
                  onClick={channel => this.goToChannel(channel)}
                />
              )}
            />
          </View>
        );
      }

      goToChannel(channel) {
        this.props.store.selectChannel(channel);
        this.props.navigator.push({
          screen: SCREENS.CHANNEL
        });
      }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
