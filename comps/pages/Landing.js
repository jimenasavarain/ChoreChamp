import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Facebook, Asset, Font} from 'expo';


  
import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';


class Landing extends React.Component {
  
  handleLogin=()=>{
    this.props.dispatch(ChangePage('Login'));
    
  }
  
  handleFBlogin=async()=>{
    try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('966865153515286', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      //this.props.dispatch(ChangePage(4));
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
    
  }
  
  handleCAccount=()=>{
    this.props.dispatch(ChangePage('CAccount'));
  }  
  
  render() {
    return (
      
      
      <LinearGradient
          colors={['#01061C', '#38385E']}
          style={{width: '100%', height:'100%', alignItems: 'center'}}>
      <View style={styles.container}> 
    <Text style={styles.titleAlarma} ><Text style={{fontSize:45}}>W</Text>ELCOME TO</Text>
        <Image 
			style={styles.logoImg} 
			source={require('../Content/icons/Logo.png')}
			resizeMode="contain"/>
        
        
       
        <View style={styles.buttonContainer}>   

           <TouchableOpacity style={styles.containerBut} onPress={this.handleLogin}>
             <Text style={styles.textBut} >Log In</Text>
           </TouchableOpacity> 

          <TouchableOpacity style={styles.containerBut} onPress={this.handleCAccount}>
             <Text style={styles.textBut} >Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
</LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',

  },
  
  logoImg: {
	position:'absolute',
	top:120,
    width:367,
 
  },
  
  titleAlarma: {
    color: 'white',
	position:'absolute',
	top:70,
    fontSize: 35,
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
    
  },
  
  buttonContainer: {
	position:'absolute',
	top:390,
    padding:50,
    width: 400,
    height: 250,
    justifyContent: 'space-between',
    
  },
  
  containerBut: {
    alignItems: 'center',
    width:300,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    marginTop:15,
   
  },
  
  containerButFB: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 7,
    backgroundColor: '#475993',
    width:300,
    height:50,
    
  },
  
  textBut: {
    fontSize:25,
    padding: 10,
    textAlign:'center',
    color: 'white',
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
  },
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Landing);