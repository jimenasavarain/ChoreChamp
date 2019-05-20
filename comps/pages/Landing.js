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
        <Image 
			style={styles.logoImg} 
			source={require('../Content/icons/Logo.png')}
			resizeMode="contain"/>
        
        
       
        <View style={styles.buttonContainer}>   

           <TouchableOpacity style={styles.containerButSignUp} onPress={this.handleCAccount}>
             <Text style={styles.textBut} >Sign Up</Text>
           </TouchableOpacity> 

          <TouchableOpacity style={styles.containerButLogin} onPress={this.handleLogin}>
             <Text style={styles.textBut2}>Sign In</Text>
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
	top:20,
    flex: 1,
    width:330,
    justifyContent: 'center',
    alignItems: 'center',
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
  
  containerButSignUp: {
    alignItems: 'center',
    width:290,
    borderRadius: 50,
    backgroundColor: '#8AD0C5',
    marginTop:15,
   
  },
    
    containerButLogin: {
    alignItems: 'center',
    width:290,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#8AD0C5',
    color: '#8AD0C5',
    marginTop:15,
  },
  
  containerButFB: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
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
    
    textBut2: {
    fontSize:25,
    padding: 10,
    textAlign:'center',
    color: '#8AD0C5',
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