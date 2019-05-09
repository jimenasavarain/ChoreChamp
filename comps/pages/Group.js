import React from 'react';
import { Modal, StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Constants, Permissions, LinearGradient, Font, MapView} from 'expo';
import LottieView from 'lottie-react-native';

//https://www.npmjs.com/package/react-native-dialogbox
import Nav from "../Nav";


import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';

class Group extends React.Component {
    
  handleProfile=async ()=>{
    
    var fd= new FormData();
      fd.append("id", this.props.id);
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getUser.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log("user",json);
      if (json.length > 0) {
        //json.id 
        //alert ("Account Created");
       var resp=await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAuzOkzXzY0iM25zYZpvVJ1IHOE-QMEkK8&fields=geometry&inputtype=textquery&input="+json[0].location_main);
       var json2=await resp.json();
        console.log(json2);
        
        var initialPosition={
               latitude: json2.candidates[0].geometry.location.lat,
               longitude:  json2.candidates[0].geometry.location.lng,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421}
       
        
        this.setState({
          address:json[0].location_main,
          un:json[0].username,
          initialPosition:initialPosition,
        })
        
         let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
      let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        lat_difference= Math.abs(location.coords.latitude - initialPosition.latitude)
        
        long_difference= Math.abs(location.coords.longitude - initialPosition.longitude)
        
        console.log(lat_difference, long_difference);
        
//real distance
        if(lat_difference < 0.004 && long_difference < 0.004){
          //this.handleAlert();
          
          <AlertLocation/>
        }
          
        
        var fd= new FormData();
        fd.append("user_id", this.props.id);
        fd.append("latitude", location.coords.latitude);
        fd.append("longitude", location.coords.longitude);
          
        var resp=await fetch("https://alarmaproj2.herokuapp.com/UpdateLocation.php", {
          method:"POST",
          body:fd
        });
          console.log(resp);
//for testing
//          if(lat_difference < 0.08 && long_difference < 0.08){
//            this.handleAlert();
//        }
        /*
        get your geolocation latitude and longitude
        lat_difference= Math.abs(myLatitude - initialPosition.latitude)
        
        lng_difference= Math.abs(myLng - initialPosition.longitude)
        
        if(lat_difference < 0.0001 && lng_difference < 0.0001){
          alert(whatever)
        }
        */
      } else {
        
      }
  }
constructor(props) {
    super(props);
  }



// fetch data

state={
    userid:[],
    gName:[],
    score:[],
    group_id:"",
    group_name:"",
    passcode:"",
	//For Users Profile
    initialPosition:{
               latitude: 49.2485,
               longitude: -123.0014,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421},
	
	modalVisible: false,
    curUser:null,
	address:"",
    un:"",
    scoreT:0,
    lvlTitle:"",
    value:null,
    //image: "",
    image: this.props.avatar,
    location: null,
    errorMessage: null,
    alertOpacity:0,
    opacityChange:1,
  }

// State to Open Indivisual User's Profile 
setModalVisible=(visible,user)=>{
    this.setState({
      modalVisible: visible,
      curUser:user
    });
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
    console.log(json);
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
          gName:json[0].group_name
        });
      } else {
        
      }
    
    console.log(json);
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

renderIndUser=(userid,curUser)=> {
    
    var userid = userid || [];
	console.log(userid);
   return userid.map((user,index) =>
                    
     <View
		 key={user}
         style={styles.allUsers}
		 >
                        
      <View>
		  
		  <TouchableOpacity 
			  style={{
			    alignItems: 'flex-start', 
                     }}
			    onPress={() => {
                	 this.setModalVisible(true, user);
                	}
				}>
				  <View style={styles.userNdscore}>
					<Text style={styles.uNsText}>
						{(user.score)? user.score : 0}
					</Text>

					<Text style={styles.uNsText}>
						{"  "}{user.username}
					</Text>
				  </View>
           </TouchableOpacity>
          
		  
      	  <Modal
			  animationType="fade"
			  transparent={true}
			  visible={this.state.modalVisible}
			  onRequestClose={() => {
				 Alert.alert('Modal has been closed.');
              }}
		  >
					  
			  <View 						  
				 style={styles.modalContainer}
			  >
				 <LinearGradient   
				   colors={['#01061C', '#38385E']}
				   style={{
				     width:420, 
				     height:'100%', 
					 alignItems: 'center'}}
				 >
					
					<View
						style={styles.topIndUserContainer}>
						<Text 
							style={styles.userName}
						>
							{(this.state.curUser) ? this.state.curUser.username : null}
						</Text>
						
						<Image 
							source={(this.state.image) ? {uri:this.state.image} : require('../Content/Imgs/ProfilePic.png')}
							style={styles.profilePhoto}
							resizeMode="contain"
              			/>
					    <Text style={styles.lvlText}>
							Level: {(this.state.curUser) ? this.state.curUser.lvlTitle : 'Recruit'}
						</Text>
							  <LottieView
								source={require('../Content/Imgs/star.json')}
								style={styles.lottie}
								autoPlay
								loop
							  />
					</View>
							
					<View style={styles.scoresCont}>
					  <Text style={styles.textScore}>
						  Total {"\n"} 
						  {/*/{(this.state.curUser) ? this.state.curUser.scoreT : 0}*/}
						  
						  { (user.score) ? user.score : 0 }
					  </Text>
					</View>
					
					<View style={styles.mapAndLocationCon}>
							<MapView
								style={styles.map}
								initialRegion={this.state.initialPosition}
								region={this.state.initialPosition}>

						   <MapView.Marker
							 coordinate={this.state.initialPosition}
							 title={"Home"}
							 description={this.state.address}
							 />

						   </MapView>


							<View style={styles.locationContainer}>
							  <Text style={styles.locationText}>Current Address: {this.state.address}</Text>
							</View>
					</View>
					<TouchableOpacity
						style={styles.hideButt}
						onPress={() => {
							this.setModalVisible(!this.state.modalVisible);
						}}> 
						<Text style={styles.hideButtText}>
							Hide
						</Text>
					</TouchableOpacity>
            		<Nav/>
				{/*	
					<View style={styles.imgCon}>
      					{(this.props.admin === 2) ?
						<TouchableOpacity 
							  onPress={handleVerifyImage}>
							  <Text style={styles.verifyButt}>IMAGE</Text>
						</TouchableOpacity> : null}
      				</View>
				*/}
				</LinearGradient>
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
               
                {/*-- Back button +  Name of the Group + Icon */}
                <Text style={styles.title}>{this.state.gName}</Text>
                   </View>

            <View 
				style={styles.middleContainer}>
                 <Text 
					 style={styles.textLabel}> 
					 Scoreboard 
				</Text>
				
				  {this.renderIndUser(this.state.userid)}
				
            </View>
          </LinearGradient>
				
				            <Nav/>

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
	
allUsers: {  
   position:'relative',
   width:'100%',
   padding:10,
   //backgroundColor:'rgba( 255, 255, 255, 0.5)',
   marginTop:10,

},
	
textLabel: {
    color: '#49CBC6',
    fontSize: 20,
    textAlign: 'left',
    justifyContent: 'flex-start',
    //fontFamily: 'Raleway-Regular',
   // fontFamily: 'NunitoSans-Regular',
  },
uNsText:{
	color: '#49CBC6',
	fontSize: 20,
},
groupname:{
    color:'white',
    fontSize:25,
    textAlign:'center',
  },
	
 userNdscore:{
    flexDirection: 'row',
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

topIndUserContainer:{
	flexDirection:'column',
	marginTop:20,
	borderBottomWidth:5,
	borderBottomColor:'#49CBC6',
	//backgroundColor:'green',
},
	
userName: {
    fontSize: 24,
    color: '#49CBC6',
    textAlign: 'center',
	marginBottom:10,
    },
	
 profilePhoto: {
    width: 180, 
    height: 180, 
    borderRadius: 100, 
    borderColor: '#49CBC6',
    borderWidth:2,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    },

 lvlText:{
    fontSize: 18,
    fontWeight:'500',
    color: '#49CBC6',
	textAlign:'center',
	marginTop:10,
  },
	
scoresCont: {
	position:'absolute',
    top:30,
    right:30,
	width:52,
    height:52,
    flexDirection: 'column',
	padding:1,
	borderRadius: 10,
    borderColor:'#fff',
    borderWidth:1,
	zIndex:99,
	//backgroundColor:'blue'
  },
	
 textScore: {
    fontSize: 14,
    color: '#49CBC6',
    margin:1,
    padding:2,
    textAlign:'center',
  },
mapAndLocationCon:{
	flexDirection:'row',
	bottom:200,
    position:'absolute',
	//backgroundColor:'yellow',
	justifyContent: 'flex-start',
	padding:10,
	},
	
 map: {
    width:140, 
    height:120,
    borderRadius:10,
	margin:10,
  },
	
locationContainer: {
    backgroundColor:'#FFF',  
    width:140,
    height:120,
    borderColor:'#49CBC6',
    borderWidth:2,
    borderRadius: 5,
	margin:10,
  },
    
locationText: {
    fontSize: 15,
    color: '#49CBC6',
    padding:10,
    },
	
hideButt:{
	alignItems: 'center',
	position:'absolute',
	bottom:120,
    width:300,
    borderRadius: 7,
    backgroundColor: '#49CBC6',
    marginTop:15,
},
	
hideButtText:{
	fontSize:25,
    padding: 10,
    textAlign:'center',
    color: 'white',
	
},
	
});

function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    group_id:state.Page.group_id,
    userid:state.Page.userid,
    gName:state.Page.gName,
    group_name:state.Page.group_name,
    passcode:state.Page.passcode,
    score:state.Page.score,
  }

}


export default connect(mapStateToProps)(Group);