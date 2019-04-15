import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
        <Button title="New Task" onPress={this.handleButton.bind(this, 'CTask')} />
        <Button title="Group" onPress={this.handleButton.bind(this, 'Group')} />
        <Button title="Tasks" onPress={this.handleButton.bind(this, 'AllTasks')} />
        <Button title="Profile" onPress={this.handleButton.bind(this, 'Profile')} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Nav);