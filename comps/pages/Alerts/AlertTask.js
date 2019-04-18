import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
import { Rating } from 'react-native-ratings';
import {ChangePage, ChangeUserId} from '../../../redux/actions';
 // npm install react-native-linear-gradient --save
 class AlertTask extends Component {
    
      constructor(props) {
      super(props);
  }
     state={
        bgOpacity: 1,
        opacityOne:0,
        tasks:[],
        isChecked:[],
        userid:"",
        score:0,
        end_time:"",
        task_id:"",
    }
 HandleOpacity=()=>{
    this.setState({
        bgOpacity:this.state.opacityOne
         
    })
    
    
}     
      
       componentWillMount=()=>{
    this.handleTasks();
  }
          
   handleTasks=async ()=>{
    var fd= new FormData();
     //change id to group_id
      fd.append("group_id", this.props.group_id);
      fd.append("task_id", this.props.task_id);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        this.setState({
          tasks:json
      
        });
      } else {
        
      }
  }
   
   
      
   render() {
    return (
       
             
            
          <View style={{  justifyContent: 'center',
            width:400,
            height:500,
            opacity:this.state.bgOpacity,
            position:'relative',
            top:100,
            backgroundColor:'rgba(0, 0, 0, 0.5)',
                
                       }}
              
              >
                <LinearGradient 
                        start={{ x: 0, y: 0.35 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#49CBC6','#2d9f9b', '#4B7CB0']} 
                        style={styles.linearGradient}>
  
                 <View style={styles.taskText}>
                       
                   <View>
                    <Text style={styles.taskName}>
                     {this.props.task.task_title}
                     </Text>
                     
                     <Text>
                     {this.props.task.task_description}
                     </Text>
                     
                     <Text>
                     {this.props.task.end_time.split(" ")[0]}
                     </Text>
                     
                     <Text style={styles.starStyle}>
                        <Rating
                          type="star"
                          ratingColor='#3498db'
                          ratingBackgroundColor='#c8c7c8'
                          ratingCount={5}
                          startingValue={parseInt(this.props.task.score)}
                          readonly= {true}
                          imageSize={20}
                          style={{ paddingVertical: 10, }}
                        /> 
                      </Text>
                     
                   </View>
                    <TouchableOpacity 
                        onPress={this.props.done.bind(this, this.props.task.task_id)}
                        style={styles.button}>
                        <Text
                             style={styles.butText}>
                            Done Task</Text>
                        </TouchableOpacity>
                         <TouchableOpacity
                            onPress={this.props.close}
                            style={styles.button}>
                                <Text 
                                    style={styles.butText}
                                    >
                                Cancel</Text>
                        </TouchableOpacity>
                   
            </View>
         
              </LinearGradient>
          </View>
     );
  }
}
 const styles = StyleSheet.create({
    
container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:0,
  
  },
    
alertBox: {
  
},
                                 
linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    position: 'absolute',
    top:95,
    left:38,
    borderRadius: 5,
    
    },
                                 
contTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:300,
    margin:5,
    borderRadius: 5,
    },                             
taskText: {
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    width:290,
    height:300,
    margin:5,
    borderRadius: 5,
    },
    
taskTitle: {
   fontSize:25,
        marginTop:7,
     
    },    
taskDue: {
    fontSize:15,
    color: 'grey',
    marginTop:7,
     
    },
    
taskDesc: {
   fontSize:25,
    marginTop:15,
     
    },                                 
 
    
button: {
    borderWidth: 2,
    borderColor:'rgba(150, 150, 150, 0.5)',
    borderRadius: 5,
    backgroundColor: '#49CBC6',
    width:250,
    marginTop:30,
    
    
     
},                              
    
butText: {
    height:38,
    fontSize:20,
    position:'relative',
    top:6,
    color:'white', 
    textAlign:'center',
     
},                              
     
    
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
export default connect(mapStateToProps)(AlertTask);