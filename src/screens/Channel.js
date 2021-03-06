import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import I18n from 'react-native-i18n';
import { COLORS, NAVBAR } from '../definitions';
import Spinner from 'react-native-loading-spinner-overlay';

export default inject('store')(
  observer(
    class ChannelScreen extends Component {
      static navigatorStyle = NAVBAR;
      componentDidMount() {
        this.props.store.selectedChannel.retrieveMessages();
      }
      render() {
        const { selectedChannel, currentUser } = this.props.store;
        this.props.navigator.setTitle({
          title: I18n.t(selectedChannel.label, { defaultValue: selectedChannel.label })
        });
        // <Spinner visible={selectedChannel.isLoading} />
        return (
          <View style={styles.container}>
            <View style={styles.container}>
              <GiftedChat
                messages={selectedChannel.sortedMessages}
                onSend={messages => this.onSend(messages)}
                user={currentUser}
                renderBubble={this.renderBubble}
              />
            </View>
          </View>
        );
      }

      onSend(messages = []) {
        this.props.store.selectedChannel.sendMessage(messages[0]);
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
