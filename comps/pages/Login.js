import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, KeyboardAvoidingView,ScrollView, TouchableHighlight, TextInput  } from 'react-native';

import {connect} from "react-redux";
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font } from "expo";

class Login extends React.Component {
    
  
  //Database
  
  email = "default@gmail.com";
  password = "default";
  admin = "";

    constructor(props) {
      super(props);
  }
  
    handleProfile=async ()=>{
    
    var fd= new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
    var resp=await fetch("https://alarmapracticum.herokuapp.com/login.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    console.log(json);
    if (json.length > 0) {
      //json[0].id
      //alert ("Loged in!");
      var len = json.length -1;
      this.props.dispatch(ChangeUserId(json[len].id, json[len].group_id, json[len].admin, null, null, json[len].avatar));
      this.props.dispatch(ChangePage('Group'));
    } else {
      alert ("Sorry, this account does not exist!");
    }
      
  }


    render() {
    return (
        <View style={styles.container}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.touch} onPress={this.handleButton}>
        </TouchableOpacity>
          <Text>Log In</Text>
        </View>
        
        
                <KeyboardAvoidingView 
           behavior="padding" enabled>
                      <ScrollView > 
      
          
        <Text>Email</Text>
        
        <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
        onChangeText={(text) => this.email=text}
        
      />
        <Text>Password</Text>
        
        <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
        onChangeText={(text) => this.password=text}
        secureTextEntry={true}
      />
      
          <TouchableOpacity 
            onPress={this.handleProfile}>
            <Text>Log In</Text>
          </TouchableOpacity>
      
            </ScrollView>

              </KeyboardAvoidingView>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
    
  
  containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(Login);
