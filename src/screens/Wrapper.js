import React, { Component } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';

export default inject('store')(
  observer(
    class WrapperScreen extends Component {
      static navigatorStyle = {
        navBarHideOnScroll: false, // false, since we collapse the TopBar and the TitleBar remains visible with the top tabs
        topBarCollapseOnScroll: true,
        navBarBackgroundColor: '#e74c3c',
        navBarTextColor: '#ffffff',
        navBarComponentAlignment: 'center',
        navBarButtonColor: '#ffffff',
        screenBackgroundColor: '#F5FAFA',
        navBarTitleTextCentered: true,
        statusBarColor: '#e74c3c',
        navBarTextFontBold: true,
        navBarHeight: 40,
        topTabsHeight: 40,
        topBarBorderColor: '#c0392b',
        topBarBorderWidth: 10,
        topTabTextColor: '#f0f0f0',
        selectedTopTabTextColor: '#ffffff',
        selectedTopTabIndicatorHeight: 15,
        selectedTopTabIndicatorColor: '#c0392b'
      };
      render() {
        return this.props.children;
      }
    }
  )
);
