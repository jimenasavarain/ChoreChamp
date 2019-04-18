import React from 'react';
import { Modal, StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font, Asset } from 'expo';

//https://www.npmjs.com/package/react-native-dialogbox

import CheckBox from 'react-native-check-box';
import { Rating } from 'react-native-ratings';
import {connect} from 'react-redux';
import {ChangePage, ChangeUserId} from '../../redux/actions';

import Nav from '../Nav'

import AlertTask from './Alerts/AlertTask';

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
    tasks:[],
    isChecked:[],
    userid:"",
    score:0,
    end_time:"",
    modalVisible: false,
    curTask:null
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
      
      fd.append("task_id", id);
      
      var resp=await fetch("https://alarmaproj2.herokuapp.com/uncheck.php", {
        method:"POST",
        body:fd
      });
    
      
      this.handleTasks()
    }

// Handle To Display Created Tasks
handleTasks=async ()=>{
    var fd= new FormData();
      fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        this.setState({
          tasks:json
      
        });
      } else {
        
      }
  }

// Handle to Verify Tasks
handleVerify=async (id)=>{
    var fd= new FormData();
        fd.append("task_id", id);
      
        var resp=await fetch("https://alarmaproj2.herokuapp.com/taskDone.php", {
          method:"POST",
          body:fd
        });
    
        var json=await resp.json();
        console.log(json);
        if (json === true) {
            
        } else {
         }
  }

// Handle to Send Score
handleScore=async (id)=>{
        var fd= new FormData();
        fd.append("user_id", this.props.userid);
        fd.append("task_id", id);
      
        var resp=await fetch("https://alarmaproj2.herokuapp.com/score.php", {
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
    }

// Grabbing and Displaying Tasks + Applying Verification & Score Functions
renderTasks=(tasks)=> {
    
    var tasks = tasks || [];
  console.log(tasks);
   return tasks.map((task,index) =>
                    
     <View key={task.task_id}>
                        
    <CheckBox
          style={{flex: 1, padding: 15}}
          onClick={()=>{
           var checkarr = this.state.isChecked;
           if(checkarr[index]){
             this.handleUncheck(task.task_id);

           } else {
             checkarr[index] = true;
             this.handleScore(task.task_id);
             
            }
            this.setState({
                isChecked:checkarr
            })
          }}
          isChecked={((this.state.isChecked[index] && this.state.isChecked[index] === true)) || (task.user_id !== null )}
          rightText={this.state.task_title}
      />                          

        <TouchableOpacity onPress={() => {
            this.setModalVisible(true, task);
          }}>
           <View style={styles.allTasks}>
            <Text style={styles.taskTitle}>{task.task_title}</Text>
            <Text style={styles.taskDesc}>{task.task_description}</Text>  
            <Text style={styles.dueDate}>{task.end_time.split("")[0]}</Text>
        
                        
    <View>
      {(this.props.admin === 2) ?
            <TouchableOpacity 
                  onPress={this.handleVerify.bind(this,task.task_id)}
                    style={{width: 50, height: 50, }}>
                  <Text style={styles.taskTitle}>Verify Task</Text>
            </TouchableOpacity> : null}
    
        
      <View>
          <Rating
           type="star"
           ratingColor='#3498db'
           ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            startingValue={parseInt(task.score)}
            readonly= {true}
            imageSize={20}
            style={{ paddingVertical: 10, }}
          /> 
        </View>
      </View>
               
        </View>
      </TouchableOpacity>
      <View>                 
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
                            }}>
            <AlertTask task={this.state.curTask} close={()=>{
              this.setState({
                modalVisible:false
              })}}
              done={this.handleScore}
              />
                        
        </Modal>
     </View>
    </View>
                        
                    
   );
 }     

    render() {
       
    return (
    
        <View style={styles.container}>
            
        <LinearGradient   colors={['#01061C', '#38385E']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
            
            <View style={styles.containerTop}>
                <Text style={styles.title}>Tasks</Text>
            </View>
        
        <View style={styles.middleContainer}>
                 
            <ScrollView>
            {this.renderTasks(this.state.tasks)}
            </ScrollView>
            
            <Nav/>
            
        </View>
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