import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import I18n from 'react-native-i18n';
import { listenToMessages } from '../services/api';
import { COLORS, NAVBAR } from '../definitions';
import Spinner from 'react-native-loading-spinner-overlay';

export default inject('store')(
  observer(
    class ChannelScreen extends Component {
      static navigatorStyle = NAVBAR;
      componentDidMount() {
        const selectedChannel = this.props.store.selectedChannel;
        selectedChannel.startLoading();
        this.unsubscribeMessageListener = listenToMessages(selectedChannel);
      }
      componentWillUnmount() {
        // TODO: remove this later because we want to listen to messages even when not in channel
        this.unsubscribeMessageListener();
      }
      render() {
        const { selectedChannel, parents } = this.props.store;
        this.props.navigator.setTitle({
          title: I18n.t(selectedChannel.label, { defaultValue: selectedChannel.label })
        });
        return (
          <View style={styles.container}>
            <View style={styles.container}>
              <Spinner visible={selectedChannel.isLoading} />
              <GiftedChat
                messages={selectedChannel.sortedMessages}
                onSend={messages => this.onSend(messages)}
                user={parents[0]}
                renderBubble={this.renderBubble}
              />
            </View>
          </View>
        );
      }

      onSend(messages = []) {
        this.props.store.sendMessage(this.props.store.selectedChannel, messages[0]);
      }

      renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.MAIN3
              },
              right: {
                backgroundColor: COLORS.MAIN1
              }
            }}
          />
        );
      }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
