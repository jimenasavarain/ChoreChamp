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
                <Image 
					style={styles.imgUn}
					resizeMode="contain"
                    source={require('../Content/icons/Logo.png')}
                      /> 
            
                <View style={styles.midLogin}>
                    <KeyboardAvoidingView 
                    style={styles.keyboardView} 
                    behavior='position' >
                        
                    <View style={styles.signCon}>
                        <ScrollView>
                        <Text style={styles.signInTitle}>Email</Text>
        
                        <TextInput 
                            style={styles.signInput} 
                            autoCapitalize="none" 
                            autoCorrect={false} underlineColorAndroid='transparent'
                            onChangeText={(text) => this.email=text}
        
                        />
                        <Text style={styles.signInTitle}>Password</Text>

                        <TextInput 
                            style={styles.signInput} 
                            autoCapitalize="none" 
                            autoCorrect={false} underlineColorAndroid='transparent'
                            onChangeText={(text) => this.password=text}
                            secureTextEntry={true}
                        />
                        
                        <TouchableOpacity 
                            onPress={this.handleProfile} 
                            style={styles.loginbut}>
                            
                        <Text style={styles.textlogin}>Sign In</Text> 
           
                        </TouchableOpacity>
                        </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </View>
      
      </LinearGradient>
      
    )
  }
}

const styles = StyleSheet.create({
  
  imgUn:{
    position: 'relative',
    top:15,
    width:'80%',  
    height:'30%',  
  },
  
  midLogin: {
    alignItems:'flex-start',
    //backgroundColor: 'red',
    //borderRadius: 10,
    height: '70%',
    paddingHorizontal:'10%',
    position:'relative',
    top:15,
    zIndex: 2,
  },
 keyboardView:{
    //backgroundColor:'orange',
    justifyContent: 'space-between',
    flex:1,
  },
 signCon:{
     //backgroundColor:'#CCC',
     position:'relative',
     top:80,
    },
  
 signInTitle:{
    color: '#FF8357',
    fontSize: 25,
  },
  
 signInput:{
    borderWidth:2,
    borderRadius: 7,
    borderColor:'#49CBC6',
    backgroundColor:'white',
    padding:5,
    fontSize:20,
    marginBottom:15,
    width:'100%',

  },
  
  logoImg:{
    top: 100
  },
  
  loginbut:{
    alignItems: 'center',
    width:300,
    marginTop:15,
	 borderRadius: 50,
    backgroundColor: '#8AD0C5',

  },
  
  textlogin:{
    fontSize:25,
    padding: 10,
    textAlign:'center',
    color: 'white',
    //backgroundColor:'blue',
  },

});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(Login);
