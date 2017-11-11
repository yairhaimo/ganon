import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import I18n from 'react-native-i18n';
import Spinner from 'react-native-loading-spinner-overlay';
import ChatRow from '../components/ChatRow';
import { SCREENS } from './index';

export default inject('store')(
  observer(
    class MessagesScreen extends Component {
      static navigatorStyle = {
        navBarHidden: true
      };
      componentDidMount() {
        this.props.store.retrieveChannels();
      }
      render() {
        const { channels, isLoadingChannels } = this.props.store;
        // <Spinner visible={isLoadingChannels} />
        if (!channels) {
          return <Text>Loading</Text>;
        }
        return (
          <View style={styles.container}>
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
