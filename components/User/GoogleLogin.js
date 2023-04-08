import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const GoogleLogin = (props) => {
    console.log(props)
  return <WebView source={{ uri: props?.route?.params }} style={{ flex: 1 }} />;
}

export default GoogleLogin