import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from "./pages/Login";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import CTask from "./pages/CTask";
import AllTasks from "./pages/AllTasks";

import {connect} from "react-redux";
import {ChangePage} from "../redux/actions";

 class Main extends React.Component {

  handleButton=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  
    render() {
        var curpage = <Login />;
        
        //we are changing state to use the global state
        switch (this.props.page){
            case 'Login':
                curpage = <Login />;
                break;
            
            case 'Group':
                curpage = <Group />;
                break;
                
             case 'Profile':
                curpage = <Profile />;
                break; 
                
            case 'CTask':
                curpage = <CTask />;
                break;   
                
            case 'AllTasks':
                curpage = <AllTasks />;
                break;       
            
     }
        
        
    return (
      <View style={styles.container}>
          {curpage}
      <Button
                title="Login"
                onPress={this.handleButton.bind(this,'Login')}
                />
            <Button
                title="Group"
                onPress={this.handleButton.bind(this,'Group')}
                />

            <Button
                title="Profile"
                onPress={this.handleButton.bind(this,'Profile')}
                />

            <Button
                title="Create Task"
                onPress={this.handleButton.bind(this,'CTask')}
                />

            <Button
                title="All Tasks"
                onPress={this.handleButton.bind(this,'AllTasks')}
                />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

    
});

function mapStateToProps(state){
  return {
    page:state.Page.page
  }
}

export default connect(mapStateToProps)(Main);