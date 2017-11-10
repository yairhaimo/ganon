import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';

export default ({ item, onClick }) => (
  <TouchableOpacity onPress={() => onClick(item)}>
    <View key={item._id} style={styles.wrapper}>
      <View style={styles.avatar} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{I18n.t(item.label)}</Text>
        <Text style={styles.lastMessage}>
          {(item.messages.length &&
            item.messages[item.messages.length - 1].user.name +
              ': ' +
              item.messages[item.messages.length - 1].text) ||
            I18n.t('channels.defaultMessage')}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  avatar: {
    borderRadius: 30,
    backgroundColor: '#e74c3c',
    width: 50,
    height: 50
  },
  textWrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e4e9e9',
    flex: 1,
    paddingLeft: 15,
    marginLeft: 15
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'flex-start'
  },
  lastMessage: {
    fontSize: 13
  }
});
