import React from 'react';
import {Modal, StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font, Asset } from 'expo';

//https://www.npmjs.com/package/react-native-dialogbox

import CheckBox from 'react-native-check-box';
import { Rating } from 'react-native-ratings';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';

import AlertTask from './Alerts/AlertTask';
import Nav from "../Nav";


class AllTasks extends React.Component {
    
// States
admin ="";
timer = null;

constructor(props) {
    super(props);
  }

// Function Redirect to Profile
 handleProfile=()=>{
 this.props.dispatch(ChangePage('Profile'));
    
  };

// Fetch Data For Created Tasks ***  
state={
    tasks:"",
    isChecked:[],
    userid:"",
    score:0,
    end_time:"",
    modalVisible: false,
    curTask:null,
    group_id:"",
    task_id:[],
    taskid:[],
  }

// State to Open Modal
    setModalVisible(visible,task) {
    this.setState({
      modalVisible: visible,
      curTask:task
    });
  }

// When Page Will Load
componentWillMount=()=>{
    this.handleTasks();
    this.timer = setInterval(()=>{
      this.handleTasks();
    },2000);
  }

// When Leaving Page Clear Timer
componentWillUnmount=()=>{
    clearInterval(this.timer);
  }

// Handle to Check/Uncheck Tasks
handleUncheck=async (id)=>{
      var fd= new FormData();
      
      fd.append("task_id", this.props.task_id);
      console.log(this.props.task_id);
      var resp=await fetch("https://alarmapracticum.herokuapp.com/uncheck.php", {
        method:"POST",
        body:fd
      });
    
      
//      this.handleTasks()
    };

// Handle To Display Created Tasks
handleTasks=async ()=>{
    var fd= new FormData();
       fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmapracticum.herokuapp.com/getTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          taskid:json
      
        });
      } else {
        
      }
     //   console.log(taskid);

  };
//Handle to display Discription


// Handle to Verify Tasks
handleVerify=async (id)=>{
    var fd= new FormData();
        fd.append("task_id", id);
      
        var resp=await fetch("https://alarmapracticum.herokuapp.com/taskDone.php", {
          method:"POST",
          body:fd
        });
    
        var json=await resp.json();
        console.log(json);
        if (json === true) {
            
        } else {
         }
  };

// Handle to Send Score
handleScore=async (id)=>{
        var fd= new FormData();
        fd.append("user_id", this.props.userid);
        fd.append("task_id", this.props.taskid);
      
        var resp=await fetch("https://alarmapracticum.herokuapp.com/score.php", {
          method:"POST",
          body:fd
        });
    
        var json=await resp.json();
        console.log(json);
        if (json === true) {
          this.setState({
            score:json,
            modalVisible:false
          });
        } else {
         }
    };

// Grabbing and Displaying Tasks + Applying Verification & Score Functions
//renderTasks=(tasks)=> {
 //}     

    render() {
        const state = this.state;
        var alllTasks=this.state.taskid.map((obj, index)=> {
        
        return (
            <View>
                
            <TouchableOpacity onPress={() => this.handleOnPress(index)}>
              <View style={styles.allTasks}>
              <View>
                  
                <Text style={styles.taskTitle}>{"  "}{obj.task_title}
                  
                  </Text>
                  
                  <Text style={styles.taskDesc}>{"  "}{obj.task_description}
                  </Text> 
                  <Text style={styles.dueDate}>{"  "}{obj.end_time}
                  
                  </Text>
                  
              </View>
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
                
                
                <Text style={styles.title}>Tasks</Text>
            </View>
             <Text style={{fontSize: 18, top: -120}}>All Your Tasks</Text>
        
        <View >
          <ScrollView>
              <View style={styles.middleContainer}>
                  {alllTasks}
                  
              </View>
          </ScrollView>
        </View>
                 <Nav/>
            </LinearGradient>
    </View> 
    );
  }
}

const styles = StyleSheet.create({
    
   container: {
    alignItems:'center',
    width: '100%',

  },
    containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    position:'absolute',
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
    position:'absolute',
    top:'30%',
    marginTop:20,
    height:'70%',
    alignItems:'center',
   
  },
allTasks: {
    
   borderWidth: 2,
   borderColor: '#49CBC6',
   backgroundColor:"#FFF",
   position:'relative',
   width:'85%',
   marginBottom:'5%',



},
taskTitle:{
    fontSize:30,
    color:'#49CBC6',
    
},

taskDesc: {
    fontSize:25,
    },

dueDate:{
    fontSize:25,

        
    }
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid,
    admin:parseInt(state.Page.admin),
  }
 }

//export after connecting to redux
export default connect(mapStateToProps)(AllTasks);