import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Constants, Permissions, LinearGradient, Font} from 'expo';
//https://www.npmjs.com/package/react-native-dialogbox
import Nav from "../Nav";


import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';

class Group extends React.Component {
    
    handleProfile=()=>{
    this.props.dispatch(ChangePage('Profile'));
    
  };

// fetch data

state={
    userid:[],
    gname:[],
    score:[],
    group_id:"",
    group_name:"",
    passcode:"",
  }


    componentWillMount=()=>{
    this.handleUsers();
    //this.handlePoints();
    this.handleGroupName();
    this.handlePoints();
  }
    
    handleUsers=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
      console.log(this.props.group_id);
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUsers.php", {
      method:"POST",
      body:fd
    });
      //console.log(resp);
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          userid:json
        });
      } else {
        
      }
    console.log(userid);
  };

    handlePoints=async ()=>{
    /*var fd= new FormData();
      fd.append("user_id", this.props.userid);
      fd.append("group_id", this.props.group_id);
    var resp=await fetch("http://localhost:8888/alarma_DB/getPoints.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          score:json
        });
      } else {
        
      }
    console.log(score);*/
  };


    handleGroupName=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
    
    var resp=await
    fetch("https://alarmaproj2.herokuapp.com/getGroupName.php", {
      method:"POST",
      body:fd
    });
    
    var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          gname:json[0].group_name
        });
      } else {
        
      }
    
    console.log(gname);
  };


SortArray=async (getScore)=>{
  sortedScore = getScore;
  
  sortedScore.sort(this.sortByScore);
  //sortedScore.reverse();
  
  //sortedScore = obj;
  return sortedScore;
}

sortByScore=(a, b)=>{
  if (parseInt(a.score) > parseInt(b.score)){
    return -1;
  }
  if (parseInt(a.score) < parseInt(b.score)){
    return 1;
  }
    return 0;
}
    
    render() {
        const state = this.state;
        var markers = [];
        
        //sort before map
        var sortedScore = this.SortArray(this.state.userid);
        
        var allusers=this.state.userid.map((obj, index)=> {
        
        return (
            <View>
                
            <TouchableOpacity onPress={() => this.handleOnPress(index)}>
              <View style={styles.users}>
                <Text style={styles.textLabel}>{(obj.score)? obj.score : 0}</Text>
                  
                <Text style={styles.textLabel}>{"  "}{obj.username}</Text>
              </View>
            </TouchableOpacity>
            </View>
          );
        })
        
        return ( 
                    
      <View style={styles.container}>
                 <LinearGradient   colors={['#01061C', '#38385E']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
             
            <View style={styles.containerTop}>
               
                {/*-- Back button +  Name of the page + Icon */}
                <Text style={styles.title}>Group Page</Text>
                   </View>

            <View style={styles.middleContainer}>
               <View>
                <Text style={styles.groupname}>{this.state.gname}</Text>
            </View>
              <View>
                  <Text style={styles.textLabel}> Scoreboard </Text>
                  {allusers}
              </View> 

            </View>
            <Nav/>
          </LinearGradient>
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
  
  middleContainer: {
    marginTop:20,
    padding:10,
    height:'70%',
    width:'100%',
  },
textLabel: {
    color: '#49CBC6',
    fontSize: 20,
    textAlign: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: -5,
    //fontFamily: 'Raleway-Regular',
   // fontFamily: 'NunitoSans-Regular',
  },
 groupname:{
    color:'white',
    fontSize:25,
    textAlign:'center',
  },
  users:{
    flexDirection: 'row',
  }
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid,
    gname:state.Page.gname,
    group_name:state.Page.group_name,
    passcode:state.Page.passcode,
    score:state.Page.score,
  }

}


export default connect(mapStateToProps)(Group);