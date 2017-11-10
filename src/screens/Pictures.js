import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('store')(
  observer(
    class PicturesScreen extends Component {
      render() {
        return (
          <View style={styles.container}>
            <Text>Pictures</Text>
          </View>
        );
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
