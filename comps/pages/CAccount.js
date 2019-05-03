import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font, LinearGradient} from 'expo';

import Nav from '../Nav'
//npm i react-native-keyboard-aware-scroll-view --save
class CAccount extends React.Component {
  username = "";
  email= "";
  password = "";


    handleProfile=async ()=>{
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          
    if (this.email == '' || reg.test(this.email) === false || this.password == '' || this.username == ''){
      alert("Something went wrong, please verify the info and try again!");
      return false;
    } 
    
   
    var fd= new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);
      fd.append("username", this.username);
      fd.append("location_main", this.state.description);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/register.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        //json.id 
        //alert ("Account Created");
        this.props.dispatch(ChangeUserId(json.id, null));
        this.props.dispatch(ChangePage('JorCGroup'));
        
      } else {
        alert ("Something went wrong!");
      }
      
      
  }
  

  //*************************************

   state={
        predictions:[],
        description:"",
        show:false,
    }
  
  
  handleTouchLoc=(obj)=>{
    this.setState({
      description:obj.description,
      show:false
    })
  }
  
  render() {
    
    
    if(this.state.show === false) {
      allP = null;
    }
    
    return (
	<LinearGradient colors={['#38385E', '#01061C']}
       style={{width: '100%', height:'100%', alignItems: 'center',}}>
      <View style={styles.container}>
        <View style={styles.containerTop}>

          <Text style={styles.title}>Create Account</Text>
        </View>

          <KeyboardAvoidingView style={styles.KeyboardView} 
                 behavior="padding" enabled>
            <ScrollView> 

                  <Text style={styles.textLabel}>Username</Text>

                  <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
                  style={styles.textInp}
                  onChangeText={(text) => this.username=text}
                  />

                <Text style={styles.textLabel}>Email</Text>

                  <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
                  style={styles.textInp}
                  onChangeText={(text) => this.email=text}
                  />

                <Text style={styles.textLabel}>Password</Text>

                  <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
                  style={styles.textInp}
                  onChangeText={(text) => this.password=text}
                  secureTextEntry={true}
                  />

                <TouchableOpacity style={styles.CAccountBut} 
                    onPress={this.handleProfile}>
                    <Text style={styles.buttText}>Create Account</Text>
              </TouchableOpacity>
            </ScrollView>

    </KeyboardAvoidingView>
  </View>
		</LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
container: {
    alignItems: 'center',
  },
containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    top: 0,
    width:412,
    height:100,
  },
	
title: {
    color: 'white',
    top:'30%',
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
  },
textLabel: {
	color: '#49CBC6',
    fontSize: 20,
	marginTop:15,
},
textInp: {
    fontSize: 15,
    height: 50,
    width: 300,
    borderWidth: 2,
    marginTop: 10,
    borderColor: '#49CBC6',
    backgroundColor:'white',
    padding: 10,
    borderRadius: 6,
    textAlign: 'left',
    //fontFamily: 'Raleway-Regular',
  },
	
CAccountBut:{
    height: 50,
    width: 300,
    borderWidth: 2,
    backgroundColor:'#49CBC6',
    padding: 5,
    borderRadius: 7,
    alignItems: 'center',
	marginTop: 20,
	
},
	
buttText:{
	fontSize:25,
    textAlign:'center',
    color: 'white',
	
},
  

  

});


function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(CAccount);