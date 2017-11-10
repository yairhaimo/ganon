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
      render() {
        const { numOfKids, parents, channels, name } = this.props.store;
        if (!channels || !channels.length) {
          return <Text>Loading</Text>;
        }
        return (
          <View style={styles.container}>
            <FlatList
              data={channels}
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
