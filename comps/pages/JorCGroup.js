import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, } from 'react-native';
import {Camera, Permissions, LinearGradient, Asset, Font} from 'expo';

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

import Nav from '../Nav'

class ChooseG extends React.Component {

  
  handleCGroup=()=>{
    this.props.dispatch(ChangePage('CGroup'));
  }
  
  handleJoinG=()=>{
    this.props.dispatch(ChangePage('JoinG'));
  }  
  
  render() {
    return (
      <LinearGradient
          colors={['#01061C', '#38385E']}
          style={{width: '100%', height:'100%', alignItems: 'center'}}>
      <View style={styles.container}> 
    
        
        <Text style={styles.titleAlarma} ><Text style={{fontSize:65}}>C</Text>HORECHAMP</Text>
       
        <View style={styles.buttonContainer}>   

        
           <TouchableOpacity style={styles.container} onPress={this.handleCGroup}>
            <Image style={styles.CGroupImg} source={require('../Content/icons/createG.png')} />
             
           </TouchableOpacity> 

          <TouchableOpacity style={styles.container} onPress={this.handleJoinG}>
             <Image style={styles.joinGImg} source={require('../Content/icons/joinG.png')} />
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
  
  CGroupImg: {
    marginTop:0, 
    width:125,
    height: 85,
    padding:10,
  },
  
  joinGImg: {
    marginTop:70, 
    width:100,
    height: 120,
    padding:10
  },
  
  titleAlarma: {
    color: 'white',
    marginTop: 0,
    fontSize: 50,
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
  },
  
  buttonContainer: {
    padding:50,
    width: 400,
    height: 400,
    justifyContent: 'space-between',
    
  },
  
  
  
});



function mapStateToProps(state){
  return{
    compPage:state.Page.page
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(ChooseG);