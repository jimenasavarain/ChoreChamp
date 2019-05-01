import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font} from 'expo';

import Nav from '../Nav'
//npm i react-native-keyboard-aware-scroll-view --save
class Createacc extends React.Component {
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
        this.props.dispatch(ChangePage('ChooseGroup'));
        
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
      <View style={styles.container}>
        <View style={styles.containerTop}>

          <Text style={styles.title}>Create Account</Text>
        </View>

          <KeyboardAvoidingView style={styles.KeyboardView} 
                 behavior="padding" enabled>
            <ScrollView> 

                  <Text style={styles.textLabel}>Username</Text>

                  <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
                  style={styles.textInput}
                  onChangeText={(text) => this.username=text}
                  />

                <Text style={styles.textLabel}>Email</Text>

                  <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
                  style={styles.textInput}
                  onChangeText={(text) => this.email=text}
                  />

                <Text style={styles.textLabel}>Password</Text>

                  <TextInput autoCapitalize="none" autoCorrect={false} underlineColorAndroid='transparent'
                  style={styles.textInput}
                  onChangeText={(text) => this.password=text}
                  secureTextEntry={true}
                  />

                <TouchableOpacity style={styles.createaccBut} 
                    onPress={this.handleProfile}>
                    <Text style={styles.textBut}>Create Account</Text>
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
  

  

});


function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(Createacc);