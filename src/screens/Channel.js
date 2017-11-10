import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { GiftedChat } from 'react-native-gifted-chat';

export default inject('store')(
  observer(
    class ChannelScreen extends Component {
      render() {
        console.log('selected channel', this.props.store.selectedChannel);
        const { selectedChannel, parents } = this.props.store;
        if (!selectedChannel) {
          return <Text>No Channel</Text>;
        }
        return (
          <View style={styles.container}>
            <View style={styles.container}>
              <View>
                <Text>{selectedChannel.messages.length}</Text>
              </View>
              <GiftedChat
                messages={selectedChannel.messages.slice()}
                onSend={messages => this.onSend(messages)}
                user={parents[0]}
              />
            </View>
          </View>
        );
      }

      onSend(messages = []) {
        this.props.store.sendMessage(messages[0]);
        console.log(this.props.store.selectedChannel.messages);
      }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
