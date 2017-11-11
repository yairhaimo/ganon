import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import { COLORS } from '../definitions';

export default ({ item, onClick }) => (
  <TouchableOpacity onPress={() => onClick(item)}>
    <View key={item._id} style={styles.wrapper}>
      <View style={styles.avatar} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{I18n.t(item.label, { defaultValue: item.label })}</Text>
        <Text style={styles.lastMessage}>{item.formattedLastMessage}</Text>
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
    backgroundColor: COLORS.MAIN1,
    width: 50,
    height: 50
  },
  textWrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.LIGHT4,
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
