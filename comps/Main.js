import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from "./pages/Login";
import AddButt from "./pages/AddButt";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import CTask from "./pages/CTask";
import CReward from "./pages/CReward";
import AllTasks from "./pages/AllTasks";
import AllRewards from "./pages/AllRewards";

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
             case 'AddButt':
                curpage = <AddButt />;
                break; 
                
            case 'CTask':
                curpage = <CTask />;
                break; 
                
            case 'CReward':
                curpage = <CReward />;
                break;   
                
            case 'AllTasks':
                curpage = <AllTasks />;
                break;    
            case 'AllRewards':
                curpage = <AllRewards />;
                break;       
            
     }
        
        
    return (
      <View style={styles.container}>
          {curpage}
     

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
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