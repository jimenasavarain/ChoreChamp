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
/**
handleVerifyImage=()=>{
    
  };
**/
// Fetch Data From Created Tasks ***  
state={
    tasks:[],
    isChecked:[],
    userid:"",
    score:0,
    end_time:"",
    modalVisible: false,
    curTask:null
  }



// When Page Will Load
componentDidMount=()=>{
    //this.handleTasks();
    this.timer = setInterval(()=>{
      this.handleTasks();
    },2000);
  }

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
      if (json.length >= 0) {
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

// State to Open Modal
setModalVisible=(visible,task)=>{
    this.setState({
      modalVisible: visible,
      curTask:task
    });
  }

// Grabbing and Displaying Tasks + Applying Verification & Score Functions
renderTasks=(tasks,curTask)=> {
    
    var tasks = tasks || [];
	console.log(tasks);
   return tasks.map((task,index) =>
                    
     <View
		 key={task}
         style={styles.allTasks}
		 >
                        
    <CheckBox
          style={{position: 'relative', left:0, top:10,  alignItems: 'flex-start'}}
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

      <TouchableOpacity 
          style={{
                    alignItems: 'flex-start', 
                    width:'90%', 
                    position:'relative', 
                    left:30,
                    bottom:20,
                            }}
            onPress={() => {
                this.setModalVisible(true, task);
                }
			
            }>
           <View >
            <Text style={styles.taskTitle}>{task.task_title}</Text>
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
			   {/*<Text style={styles.taskDetails}>{task.task_description}</Text>  */}
            <Text style={styles.taskDetails}>due on: {task.end_time.split(" ")[0]}</Text>
      	  </View>
            
      </TouchableOpacity>
		
      <View style={styles.verifyCon}>
			{(this.props.admin === 2) ?
			<TouchableOpacity 
				onPress={this.handleVerify.bind(this,task.task_id)}>
				<Text style={styles.verifyButt}>Verify Task</Text>
			</TouchableOpacity> : null}
      </View>
	
      <View>                 
      <Modal
		 	animationType="slide"
			transparent={true}
			visible={this.state.modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
			
            }}
			>
			<View 						  
				style={styles.modalContainer}
				>
				<View style={styles.indTask}>
					<View
						style={styles.topIndTaskContainer}>
						<Text 
						style={styles.taskTitle}
						>
						{(this.state.curTask) ? this.state.curTask.task_title : null}
						</Text>
						<Rating
							type="star"
							ratingColor='#3498db'
							ratingBackgroundColor='#c8c7c8'
							ratingCount={5}
							startingValue={parseInt((this.state.curTask) ? this.state.curTask.score : null)}
							readonly= {true}
							imageSize={20}
							style={{ paddingVertical: 10, }}
						/> 
					</View>
					<Text 
						style={styles.taskDetails}> Description:
						{(this.state.curTask) ? this.state.curTask.task_description : null}
					</Text>  
					<Text 
						style={styles.taskDetails}>
						due on: {(this.state.curTask) ? this.state.curTask.end_time.split(" ")[0] : null}
					</Text>


					<TouchableOpacity 
						onPress={() => {
							this.setModalVisible(!this.state.modalVisible);
						}}> 
						<Text style={styles.verifyButt}>
							Hide
						</Text>
					</TouchableOpacity>
				{/*	
					<View style={styles.imgCon}>
      					{(this.props.admin === 2) ?
						<TouchableOpacity 
							  onPress={handleVerifyImage}>
							  <Text style={styles.verifyButt}>IMAGE</Text>
						</TouchableOpacity> : null}
      				</View>
	  			*/}
            	</View>
            </View>
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
                    <ScrollView style={{width:'100%', height:'80%'}}>
						
						
                        {this.renderTasks(this.state.tasks)}
						
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
    height:'60%',
    width:'80%',
    alignItems:'center',
    //backgroundColor:'red',
   
  },
	
allTasks: {  
   borderWidth: 2,
   borderColor: '#49CBC6',
   backgroundColor:'#FFF',
   position:'relative',
   width:'100%',
   marginBottom:'5%',

},
	
taskTitle:{
   fontSize:30,
   color:'black',
},

taskDetails:{
   fontSize:25,
   color:'grey',
},
    
verifyButt:{
   fontSize:25,
   padding: 12,
   textAlign:'center',
   color: '#FFF',
   backgroundColor:'#49CBC6',
   borderWidth:2,
   borderRadius: 5,
   borderColor:'#49CBC6',
   marginBottom:20,
},
verifyCon:{
   alignItems:'center',
        
    },
modalContainer:{
	position:'absolute',
	top:0,
	bottom:0,
	right:0,
	left:0,
	margin:'auto',
	backgroundColor:'rgba( 0, 0, 0, 0.5)',
	height:'100%',
	
},
indTask:{
	backgroundColor:'#FFF',
	marginTop:160,
	marginRight:40,
	marginLeft:40,
	padding:20,
	borderWidth:2,
	borderColor: '#49CBC6',
	borderRadius:5,
},
	
topIndTaskContainer:{
	flexDirection:'row',
	borderBottomWidth:5,
	borderBottomColor:'#49CBC6',
	justifyContent: 'space-between',
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