import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import CTask from "./pages/CTask";
import CReward from "./pages/CReward";
import AllTasks from "./pages/AllTasks";
import AllRewards from "./pages/AllRewards";
import AddButt from "./pages/AddButt";
import CAccount from "./pages/CAccount";
import CGroup from "./pages/CGroup";
import JoinG from "./pages/JoinG";
import JorCGroup from "./pages/JorCGroup";

import {connect} from "react-redux";
import {ChangePage} from "../redux/actions";

 class Main extends React.Component {

  handleButton=(page)=>{
    this.props.dispatch(ChangePage(page));
  }
  
  
    render() {
        var curpage = <Landing />;
        
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
				
		   case 'CReward':
                curpage = <CReward />;
                break;   
                
           case 'CTask':
                curpage = <CTask />;
                break;   
                
           case 'AllTasks':
                curpage = <AllTasks />;
                break; 
            
          case 'CAccount':
                curpage = <CAccount />;
                break; 
            
          case 'CGroup':
                curpage = <CGroup />;
                break; 
          
          case 'JoinG':
                curpage = <JoinG />;
                break; 
          
          case 'JorCGroup':
                curpage = <JorCGroup />;
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