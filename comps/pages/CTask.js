import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, DatePickerIOS,  ScrollView, KeyboardAvoidingView   } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font, Asset} from 'expo';

import DatePicker from 'react-native-datepicker';
import { Rating } from 'react-native-ratings';

//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';
import Nav from '../Nav';


class CTask extends React.Component {
  
     
    
  task_title = "";
  task_description = "";
  rating=0;
  end_time="";
  
handleButton=(switchPageNum)=>{
    this.props.dispatch(ChangePage(switchPageNum))
  }

    constructor(props) {
      super(props);
      this.state = { 
      date:"",
      };
  }

    
    handleCTask=async ()=>{
    if (this.task_title === '' || this.task_description === '' || this.date === '' || this.rating === 0){
      alert("Please fill in the inputs");
      return false;
    }
   
    var fd= new FormData();
      fd.append("task_title", this.task_title);
      fd.append("task_description", this.task_description);
      fd.append("end_time", this.state.date+" 00:00:00");
      fd.append("score", this.rating);
      fd.append("group_id", this.props.group_id);

      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/createTask.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json === true) {
        
        //alert ("Task Created");
        this.props.dispatch(ChangePage('AllTasks'));
        
      } else {
        alert ("Something went wrong!");
      }
    }
    
     ratingCompleted=(rating)=> {
  this.rating = rating;
  }
    
    render() {
    return (
        
      <View style={styles.container}>
            <LinearGradient   colors={['#01061C', '#38385E']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
        <View style={styles.containerTop}>
           <Text style={styles.title}>Create Task</Text>
        </View>
        
        <KeyboardAvoidingView 
           style={styles.keyboardView} 
           behavior="padding" enabled>
              <ScrollView > 
                    <View style={styles.middleContainer}>
                        <Text style={styles.textLabel}>Title</Text>

                        <TextInput
                            style={styles.titleInp}
                            autoCapitalize="sentences" 
                            autoCorrect={true} 
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.task_title=text}
                        />
                        <Text style={styles.textLabel}>Due Date</Text>

        <DatePicker
            style={styles.datePicker}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-12-01"
            maxDate="2031-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: -5,
                marginLeft: 0,
                marginTop:10
                },
                dateInput: {
                marginLeft: 36,
                borderColor: '#337373',
                borderRadius: 8,
                height:50,
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          <Text style={styles.textLabel}>Description</Text>

          <TextInput 
            autoCapitalize="sentences" 
            autoCorrect={true} 
            underlineColorAndroid='transparent'
            style={styles.decInput}
            onChangeText={(text) => this.task_description=text}
            multiline = {true}
            maxLength={255}
            numberOfLines ={6}
          />
   
    <Text style={styles.textLabel}>Points
        <Text style={styles.tuts}> Use your finger to swipe </Text>                
        </Text>
                        
       <Rating
           type="custom"
           ratingColor='#F1CA02'
           ratingBackgroundColor='#FFF'
            startingValue={1}
            ratingCount={5}
            imageSize={35}
            onFinishRating={this.ratingCompleted}
            onStartRating={this.ratingStarted}
            style={styles.rating}
          /> 

          <TouchableOpacity 
            style={styles.cTaskButt}   
            onPress={this.handleCTask}>
          <Text style={styles.cTaskTxt}>Create Task</Text>
          </TouchableOpacity>
        </View>
            </ScrollView>
           
            
            </KeyboardAvoidingView>
 <Nav />
            </LinearGradient>
      </View>

    );;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'blue',
    alignItems: 'center',
  },

//Main Header of the page    

  containerTop: {
    marginTop:0,
    top: 0,
    width:352,
    height:100,
	borderBottomWidth:2,
	borderBottomColor:'#337373',
	marginHorizontal:10,
  },
title: {
    color: 'white',
    top:'30%',
    fontSize: 30,
    textAlign: 'right',
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
  }, 
    
  keyboardView: {
    position:'absolute',
    flex:1,
    top: '15%',
    alignItems: 'center',
    justifyContent: 'space-between',
   // backgroundColor:'red',
    zIndex:1,
    height:'80%',
  },
    
  middleContainer: {
   flex: 1,
   alignItems: 'center',
  },

 datePicker: {
    width: 300, 
    marginTop:15,
    marginBottom:5, 
    backgroundColor:'white',
    borderColor: '#297373',
    backgroundColor:'white',
    borderRadius: 6,
    borderWidth: 2,
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
tuts:{
    color: '#FF8357',
    fontSize: 20,
 
},
titleInp: {
    color: '#4d4d4d',
    fontSize: 15,
    height: 50,
    width: 300,
    borderWidth: 2,
    marginTop: 10,
    borderColor: '#337373',
    backgroundColor:'white',
    padding: 10,
    borderRadius: 6,
    textAlign: 'left',
    //fontFamily: 'Raleway-Regular',
  },
decInput: {
    color: '#337373',
    fontSize: 15,
    height: 100,
    width: 300,
    borderWidth: 2,
    marginTop: 10,
    borderColor: '#337373',
    backgroundColor:'white',
    padding: 10,
    borderRadius: 6,
    //fontFamily: 'NunitoSans-Regular',
  },
rating: {
    marginTop:10,
    marginBottom:10,
    paddingVertical: 10,
    paddingTop:3,
    borderColor: '#337373',
    backgroundColor:'white',
    borderRadius: 6,
    borderWidth: 2,
    width:'100%',
    alignItems: 'center',
    },
    
cTaskButt: {
    marginTop:10,
    alignItems: 'center',
    padding: 5,
    paddingTop: 17,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    width:300,
    height:60,
     },
    
cTaskTxt: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'NunitoSans-Regular',
  },

   
    
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id
  }
}

//export after connecting to redux
export default connect(mapStateToProps)(CTask);