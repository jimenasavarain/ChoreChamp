import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Timer } from 'react-native';
import {Camera, Constants,  LinearGradient, Font} from 'expo';
import LottieView from 'lottie-react-native';
import {AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressCircle from 'react-native-progress-circle'
//npm install --save react-native-progress-circle

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
    scoreT:0,
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
    const fill = this.state.score;
   // const prefill = this.state.score
  //  const Max_Points = this.state.rewards;



   var rewards = rewards || [];
  
   return rewards.map((reward,index) => {
        var pr = Math.round(this.state.scoreT / parseInt(reward.reward_points)*100);
        //alert(this.state.score);
     return(<View style={styles.taskCont} key={reward.id}>
     
           <View style={styles.contTitle}>
                <Text style={styles.rewardName}>
                    {reward.reward_title}</Text>
            </View>
  

      <Text style={styles.taskDesc}>    
          {reward.reward_points} points
          
      </Text>

     
          
           <View style={{
            backgroundColor:'red',
                   }}>
          <ProgressCircle
                    percent={90}
                    radius={50}
                    borderWidth={8}
                    color="#49CBC6"
                    //shadowColor="#3399FF"
                    //bgColor="#fff"
                    ref={(ref) => this.circularProgress = ref}
        >       
              {
                  (percent) => (
                      <View style={styles.points}>
                            {reward.scoreT}
                      </View>
                    )
                  }
        </ProgressCircle>
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
                  
                  <ProgressCircle
                    percent={90}
                    radius={50}
                    borderWidth={8}
                    color="#49CBC6"
                    shadowColor="#FFF"
                    //bgColor="#fff"
                  >
                    
                  </ProgressCircle>
               
                  
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
    alignItems: 'center',
    justifyContent: 'center',
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
    
  middleContainer: {
    marginTop:20,
    padding:10,
    height:'70%',
      
  },
taskDesc: {
    fontSize: 16,
    textAlign: 'right',
    marginRight: 10,
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
    zIndex:20,
  },
  touch: {
    width: 100,
    height: 100,
    zIndex: 15,
    bottom: 0,
    marginBottom: 0,
  },

  reward: {
     width: 70, 
     height: 70, 
     borderRadius: 5, 
     borderColor: '#FFF',
     position:'absolute',
    },
   
   textBut: {
    fontSize: 25,
    color: '#49CBC6',
    },
    
 points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 90,
    height:38,    
    textAlign: 'center',
    color: '#49CBC6',
    fontSize: 30,
    fontWeight: "500"
  },

   touchPic: {
    right: 40,
    top: 30,
    elevation: 2, // Android
    },
    
 rewardsCon: {
    backgroundColor:'yellow',
    position:'relative',
    top:90,
    flexDirection:'row',
    flexWrap:'wrap',
    height: 700,
    width:400,
    
  },
    
    title: {
    color: 'white',
    top:'30%',
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Raleway-Regular',
    //fontFamily: 'NunitoSans-Regular',
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