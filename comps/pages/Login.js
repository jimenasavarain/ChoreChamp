import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, KeyboardAvoidingView,ScrollView, TouchableHighlight, TextInput} from 'react-native';

import {connect} from "react-redux";
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font, LinearGradient } from "expo";
//import url('https://fonts.googleapis.com/css?family=Nunito:200');

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
    var resp=await fetch("https://alarmaproj2.herokuapp.com/login.php", {
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
      <LinearGradient colors={['#38385E', '#01061C']}
       style={{width: '100%', height:'100%', alignItems: 'center',}}>
    <ScrollView>
        
      
        <View>
        <Text style={styles.header}>ChoreChamp</Text>
        </View>
        
            
                
                      <View>
                        <Text style={styles.h1}>Sign In</Text>
                      </View>
      <View style={styles.midLogin}>
          <KeyboardAvoidingView>
        <Text style={styles.email}>Email</Text>
        
        <TextInput style={styles.input1} autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
        onChangeText={(text) => this.email=text}
        
      />
        <Text style={styles.pass}>Password</Text>
        
        <TextInput style={styles.input2} autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
        onChangeText={(text) => this.password=text}
        secureTextEntry={true}
      />
    <TouchableOpacity onPress={this.handleProfile} style={styles.loginbut}>
          <Text style={styles.textlogin}>Login</Text> 
           
            </TouchableOpacity>
        </KeyboardAvoidingView>
          </View>
      
         </ScrollView> 
      </LinearGradient>
      
    )
  }
}

const styles = StyleSheet.create({
  
  header: {
    color: '#89D5C9',
    fontSize: 40,
    textAlign: 'center',
    top: 220
    //fontFamily:'Nunito, sans-serif'
  },
  
  midLogin: {
    marginTop:400,
    textAlign: 'left',
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 300,
    height:200,
    zIndex: 2
  },
  
  h1: {
    color:'white',
    fontSize:30,
    top:300,
    textAlign:'center'
  },
  email:{
    color: '#FF8357',
    fontSize: 20,
  },
   pass:{
    color: '#FF8357',
    fontSize: 20,
  },
  
  input1:{
    borderColor:'#297373',
  },
  
    input2:{
    borderColor:'#297373',
  },
  
  logoImg:{
    top: 100
  },
  
  loginbut:{
    alignItems: 'center',
    width: 200,
    left: 50,
    padding: 5,
    paddingTop: 17,
    borderRadius: 15,
    backgroundColor: '#49CBC6',
  },
  
  textlogin:{
    fontSize:20,
    textAlign:'center',
    color: 'white',
  }

});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(Login);
