import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Login from "./pages/Login";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import CTask from "./pages/CTask";
import AllTasks from "./pages/AllTasks";

import {connect} from "react-redux";
import {ChangePage} from "../redux/actions";

 class Nav extends React.Component {

   handleButton=(switchPageNum)=>{
    this.props.dispatch(ChangePage(switchPageNum))
  }
  
  
    render() {
        
        
    return (
      <View style={styles.container}>
          <View style={styles.buttons}>

              
{/*
            <Button title="Group" onPress={this.handleButton.bind(this, 'Group')} />
*/}
            <TouchableOpacity 
                style={styles.touch} 
                onPress={this.handleButton.bind(this, 'Group')}>
                <Image 
                    style={[styles.groupIcon, styles.icons] }
                    resize="contain"
                    source={require('./Content/icons/GroupIcon.png')}
                      />  
            </TouchableOpacity>
{/*
            <Button title="Tasks" onPress={this.handleButton.bind(this, 'AllTasks')} />
*/}
              <TouchableOpacity 
                  style={styles.touch} 
                  onPress={this.handleButton.bind(this, 'AllTasks')}>
                  <Image 
                      style={[styles.tasksIcon, styles.icons] }
                      resize="contain"
                      source={require('./Content/icons/task.png')}
                      />  
               </TouchableOpacity>
            {/*  <Button title="Profile" onPress={this.handleButton.bind(this, 'Profile')} />*/}
              <TouchableOpacity 
                  style={styles.touch} 
                  onPress={this.handleButton.bind(this, 'Profile')}>
                  <Image 
                      style={[styles.profileIcon, styles.icons] }
                      resize="contain"
                      source={require('./Content/icons/profile.png')}
                      />  
              </TouchableOpacity>
              
{/*
            <Button title="New Task" onPress={this.handleButton.bind(this, 'CTask')} />
*/}
            <TouchableOpacity style={styles.touch} onPress={this.handleButton.bind(this, 'AddButt')}>
                <Image 
                  style={[styles.addButt, styles.icons]}
                  resize="contain"
                  source={require('./Content/icons/addButt.png')}
                      />  
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      bottom:0,
      width:'90%',
      
   
  },
buttons: {
    flexDirection:'row',
    justifyContent: 'space-between',
    //backgroundColor:'red',
    padding:15,
    
  },

icons:{
    marginRight:5,
    marginLeft:5,
},   
groupIcon:{
    width:90,
    height:42,
},  

tasksIcon:{
    width:40,
    height:48,
},   
    
profileIcon:{
    width:40,
    height:42,
},
    
addButt:{
    width:50,
    height:48,
    
},
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Nav);