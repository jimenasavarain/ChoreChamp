import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font } from 'expo';

import Nav from '../Nav'

class JoinG extends React.Component {
  

    
//DATABASE**********************
  passcode = "";

    constructor(props) {
      super(props);
      this.state = { text: this.setState.text };
  }
  
    handleProfile=async ()=>{
    if (this.passcode == ''){
      alert("Please fill the inputs with your info");
      return false;
    }
    //this.props.dispatch(ChangePage(4));
      var fd= new FormData();
      fd.append("passcode", this.passcode);
      fd.append("userid", this.props.userid);
    
    var resp=await fetch("https://alarmaproj2.herokuapp.com/joingroup.php", {
      method:"POST",
      body:fd
    });
    
    //console.log(resp);
    var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        //json[0].id
      //alert ("Joined Group!");
      this.props.dispatch(ChangeUserId(this.props.userid, json.id));
      this.props.dispatch(ChangePage('Profile'));
    } else {
      alert ("Something is wrong!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.containerTop}>
          <Text style={styles.title}>Join Group</Text>
        </View>
        
      <View style={styles.middleContainer}>
        <Text style={styles.textLabel}>Enter Group Pin number:</Text>
        
        <TextInput autoCapitalize="none" autoCorrect={false}
          underlineColorAndroid='transparent'
          style={styles.textInput}
          onChangeText={(text) => this.passcode=text}
        />
        
      
          <TouchableOpacity style={styles.joinBut} 
            onPress={this.handleProfile}>
            <Text style={styles.textBut}>Join Group</Text>
          </TouchableOpacity>
      
        </View>
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
    justifyContent: 'flex-start',
  },
  
        
  title: {
    color: 'white',
    marginTop: -65,
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
  },

});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    userid:state.Page.userid
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(JoinG);