import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font} from 'expo';
import LottieView from 'lottie-react-native';
//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';

export default class CTask extends React.Component {
    
    handleProfile=()=>{
    this.props.dispatch(ChangePage(page));
    
  };
    
    render() {
    return (
      <View>
        <Text style={{fontSize: 18, top: -120}}>Create a Task</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
