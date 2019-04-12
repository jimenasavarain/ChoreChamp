import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, DatePickerIOS,  ScrollView, KeyboardAvoidingView   } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font, Asset} from 'expo';

import DatePicker from 'react-native-datepicker';
import { Rating } from 'react-native-ratings';

//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage} from '../../redux/actions';

class CTask extends React.Component {
    
  task_title = "";
  task_description = "";
  rating=0;
  end_time="";
  


    constructor(props) {
      super(props);
      this.state = { 
      date:"2019-04-12",
      };
  }

    
    handleProfile=async ()=>{
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

      
    var resp=await fetch("https://alarmapracticum.herokuapp.com/createTask.php", {
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
        <View style={styles.containerTop}>
          <Text>Create Task</Text>
        </View>
        
        <KeyboardAvoidingView style={styles.KeyboardView} 
           behavior="padding" enabled>
                      <ScrollView > 
        <View style={styles.middleContainer}>
          <Text>Title</Text>

          <TextInput autoCapitalize="sentences" autoCorrect={true} underlineColorAndroid='transparent'
          onChangeText={(text) => this.task_title=text}

          />
          <Text>Due Date</Text>

        <DatePicker
            style={{width: 300, marginTop:15,marginBottom:5          
                   }}
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
                borderColor: '#49CBC6',
                borderRadius: 8,
                height:50,
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          <Text>Description</Text>

          <TextInput autoCapitalize="sentences" autoCorrect={true} underlineColorAndroid='transparent'
            onChangeText={(text) => this.task_description=text}
              multiline = {true}
              maxLength={255}
              numberOfLines ={6}
          />
   
    <Text>Score</Text>
       <Rating
           type="custom"
           ratingColor='#F1CA02'
           ratingBackgroundColor='#FFF'
            startingValue={1}
            ratingCount={5}
            imageSize={35}
            onFinishRating={this.ratingCompleted}
            onStartRating={this.ratingStarted}
            style={{ paddingVertical: 10 }}
          /> 

          <TouchableOpacity 
            onPress={this.handleProfile}>
          <Text>Create Task</Text>
          </TouchableOpacity>
      
        </View>
            </ScrollView>
            </KeyboardAvoidingView>
      </View>

    );;
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
    
  KeyboardView: {
    position:'absolute',
    width:'300%',
    bottom:20,
    flex:1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
   // backgroundColor:'red',
    zIndex:-1,
    height:'70%',
  },
    
  middleContainer: {
   marginTop: 5,
   alignItems: 'center',
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