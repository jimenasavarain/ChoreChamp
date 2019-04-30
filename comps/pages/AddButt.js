import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, KeyboardAvoidingView,ScrollView, TouchableHighlight, TextInput} from 'react-native';

import {connect} from "react-redux";
import {ChangePage, ChangeUserId} from '../../redux/actions';
import { Asset, Font, LinearGradient } from "expo";
//import url('https://fonts.googleapis.com/css?family=Nunito:200');

class AddButt extends React.Component {
    
 
   handleButton=(switchPageNum)=>{
    this.props.dispatch(ChangePage(switchPageNum))
  }
  



    render() {
    return (
      <LinearGradient colors={['#38385E', '#01061C']}
       style={{width: '100%', height:'100%', alignItems: 'center',}}>
            
            
               
                <View style={styles.midLogin}>
                    <KeyboardAvoidingView 
                    style={styles.keyboardView} 
                    behavior='position' >
                        
                    <View style={styles.addButtCon}>
                        
                        <TouchableOpacity 
                            onPress={this.handleButton.bind(this, 'CTask')} 
                            style={styles.button}>
                            <Text style={styles.textlogin}>Create New Task</Text> 
                        </TouchableOpacity>
                        
                       <TouchableOpacity 
                            onPress={this.handleButton.bind(this, 'CReward')} 
                            style={styles.button}>
                            <Text style={styles.textlogin}>Create New Reward</Text> 
                        </TouchableOpacity>
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
    top:10,
    width:'20%',  
    height:'10%',  
  },
    
  header: {
    color: '#89D5C9',
    fontSize: 40,
    textAlign: 'center',
    position:'relative',
    top: 35,
    //fontFamily:'Nunito, sans-serif'
  },
  
  midLogin: {
    alignItems:'flex-start',
    //backgroundColor: 'red',
    //borderRadius: 10,
    height: '70%',
    paddingHorizontal:'10%',
    position:'relative',
    top:40,
    zIndex: 2,
  },
 keyboardView:{
    //backgroundColor:'orange',
    justifyContent: 'space-between',
    flex:1,
  },
 addButtCon:{
     //backgroundColor:'#CCC',
     position:'relative',
     top:100,
    },
  
 signInTitle:{
    color: '#FF8357',
    fontSize: 25,
  },
  
  button:{
    alignItems: 'center',
    width:300,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    marginTop:15,

  },
  
  textlogin:{
    fontSize:25,
    padding: 12,
    textAlign:'center',
    color: 'white',
    //backgroundColor:'blue',
  }

});

function mapStateToProps(state){
  return {
  }
}

export default connect(mapStateToProps)(AddButt);
