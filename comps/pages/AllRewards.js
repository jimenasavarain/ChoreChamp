import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Timer } from 'react-native';
import {Camera, Constants,  LinearGradient, Font} from 'expo';
import LottieView from 'lottie-react-native';
import {AnimatedCircularProgress } from 'react-native-circular-progress';

import PercentageCircle from 'react-native-percentage-circle';
//npm i react-native-percentage-circle --save


//import {CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';
// npm i --save react-native-circular-progress react-native-svg

// react-native link react-native-svg
import Nav from '../Nav'

import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';
const Max_Points = '';


class AllRewards extends React.Component {

  
//states
admin ="";
timer = null;

constructor(props) {
    super(props);
  }

  state={
    isMoving: false,
    pointsDelta: 0,
    rewards:[],
    reward_title:"",
    reward_points:500,
    scoreT:28,
  };
  

     
//go to create task page
    handleCTask=()=>{
    this.props.dispatch(ChangePage(CTask));
  }   
  
    componentWillMount=()=>{
    this.handleRewards();
    /*this.timer = setInterval(()=>{
      this.handleRewards();
    },1000);*/
  }
  
  componentWillUnmount=()=>{
    clearInterval(this.timer);
  } 

  
  handleRewards=async ()=>{
    
    var fd= new FormData();
    fd.append("id", this.props.userid);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getScore.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    var score = 0;
    if (json.length > 0) {
      score = parseInt(json[0].score);
         this.setState({
          scoreT:json[0].score,
        })
        
    }
    
    var fd= new FormData();
    //change id to group_id
    fd.append("group_id", this.props.group_id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getReward.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.length > 0) {
        //json.id 
        //alert ("Task Created");
        this.setState({
          rewards:json
        });
        
        //get reward_title when reaching reward_points
        var str = json.map((obj)=>{
          return obj.reward_title;
        });
        
        //rewardPts = this.state.reward_points;
        //newreward = false;
        console.log("score", score);
        var titles = [];
        
        var filter = json.filter((obj,index)=>{
          if(score >= parseInt(obj.reward_points)){
             titles.push(obj.reward_title)
             }
          return (score >= parseInt(obj.reward_points))
        });
        
        if (filter.length > 0){
          alert("You have received the rewards: "+('\n')+titles.join(", \n"));
          //newreward = true;
          
          //make it disappear
        }
        
      } else {
        
      }
  }

  renderRewards=(rewards)=> {
    const percent = this.state.score;
   // const prefill = this.state.score
  //  const Max_Points = this.state.rewards;



   var rewards = rewards || [];
  
   return rewards.map((reward,index) => {
        var pr = Math.round(this.state.scoreT / parseInt(reward.reward_points)*100);
        //alert(this.state.score);
     return(<View style={styles.taskCont} key={reward.id}>
     
        <View style={{
            //backgroundColor:'red', borderWidth:5,
			borderColor:"#49CBC6",
			borderWidth:5,
			borderRadius:5,
			padding:10,
			alignItems:'center',
			width:'90%',
			height:200,
            //position:'absolute',
	        flexDirection:'column',
			
                   }}>
                <Text style={styles.rewardTitle}>
                    {reward.reward_title}
				</Text>
				<Text style={styles.rewardTitle}>    
			  		Worth {reward.reward_points} points
		 		</Text>
		 
          <PercentageCircle
                    percent={pr}
                    radius={50}
                    borderWidth={8}
                    color="#49CBC6"
                    //shadowColor="#3399FF"
                    //bgColor="#fff"
                    ref={(ref) => this.circularProgress = ref}
			   		style={{marginBottom:10,}}
        >       
              {
                  (percent) => (
                      <View style={styles.rewardPoints}>
                            {this.prop.reward_points}
                      </View>
                    )
                  }
        </PercentageCircle>
          </View>
     
    </View>)
   });
 }
    render() {
const fill = this.state.points / Max_Points * 50;
           var rewards = rewards || [];

        
    
    return (
          <View  style={styles.container}> 
          <LinearGradient   colors={['#01061C', '#38385E']}
          style={{width:420, height:'100%', alignItems: 'center'}}>
              
            <View style={styles.containerTop}>
         
          <Text style={styles.title}>Rewards</Text>
        </View>
        
          
        <View style={styles.middleContainer}>
                        
                <ScrollView>
                    <View style={styles.rewardsCon}>
                {this.renderRewards(this.state.rewards)}
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
    backgroundColor: '#fff',
    width: '100%',
    },
    
 containerTop: {
    marginTop:0,
    backgroundColor: '#49CBC6',
    position:'absolute',
    top: 0,
    width:412,
    height:100,
	zIndex:5,
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
    //marginTop:20,
    padding:10,
	//backgroundColor:'yellow',
    position:'relative',
    top:115,
	height: '74%',
    width:'100%',
	flexWrap:'wrap',
	flexDirection:'row',
    alignItems: 'flex-start',


	//justifyContent: 'space-between',

      
  },
    
taskCont:{
	//backgroundColor:'red',
	width:170,
	height:200,
	flexDirection:'row',
	marginBottom:10,
	//flex:1,
	//alignItems: 'stretch',
	//flexDirection:'row',
},
   
 rewardTitle:{
	color: '#49CBC6',
	textAlign:'center',
	fontSize: 16,

 },
 rewardPoints: {
    backgroundColor: 'green',
    textAlign: 'center',
    color: '#49CBC6',
    fontSize: 10,
  },
    
 rewardsCon: {
    flexDirection:'row',
    flexWrap:'wrap',
    height: '100%',
    width:400,
	justifyContent: 'center',
    //position:'relative',
    //top:90,
	//flex:2,
    //flexDirection:'row',
	//justifyContent: 'space-evenly',
	//height: 2000,
    //width:400,
    
  },

    
  
    


    
});

 function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    id:state.Page.userid,
    group_id:state.Page.group_id,
    avatar:state.Page.avatar
    
  }
 }
 //export after connecting to redux
export default connect(mapStateToProps)(AllRewards);