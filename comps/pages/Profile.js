import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, } from 'react-native';
import {Camera, Constants, Permissions, Location, ImagePicker, MapView, LinearGradient, Font} from 'expo';
import LottieView from 'lottie-react-native';
//https://www.npmjs.com/package/react-native-dialogbox

import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';


class Profile extends React.Component {

  
//states
  
nextlvl = null;
  home = "";
  atHome = 2;
  avatar = "";
  state={
    
    initialPosition:{
               latitude: 49.2485,
               longitude: -123.0014,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421},
    
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
  };
  

//set image on profile 
     componentWillMount=async()=>{
    
    var { status } = await Permissions.askAsync(Permissions.CAMERA);
    var { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  
    //
    try {
      const value = await AsyncStorage.getItem('nextlvl');
      if (value !== null) {
        
        console.log(value);
        this.nextlvl=parseInt(value);
      } else {
        await AsyncStorage.setItem('nextlvl', "50")
      }
    } catch (error) {
     // Error retrieving data
      console.log(error);
    }
    
    this.handleProfile();
    this.handleScore();
    //alert(this.props.group_id);

    //current location
   
  }
     
//go to create task page
    handleCTask=()=>{
    this.props.dispatch(ChangePage(CTask));
  }   
  
    
//go to profile page
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
    



// show score
    
  handleScore=async ()=>{
    
    var fd= new FormData();
      fd.append("id", this.props.id);
      
      
    var resp=await fetch("https://alarmaproj2.herokuapp.com/getScore.php", {
      method:"POST",
      body:fd
    });
    //console.log(resp);
    var json=await resp.json();
    console.log(json);
    var score = 0;
    if (json.length > 0) {
      score = parseInt(json[0].score);
      //json[0].id
      //alert ("Loged in!");
       this.setState({
          scoreT:json[0].score,
        })
     } else {
      alert ("Something is wrong!");
    } 
    
      var newlvl = false;
      console.log(score, this.nextlvl);
    if (score > this.nextlvl && this.nextlvl != null){
        alert("You've reached a new level!");
        //this.props.dispatch(ChangePage(17));
        newlvl = true;
      }
    
    if(score === null){
      this.setState({
        lvlTitle:'Recruit'
      })
    } else if(score >= 0 && score < 50){
      this.setState({
        lvlTitle:'Learner'
      })
      if (newlvl === true){
        await AsyncStorage.setItem('nextlvl', "50")
      }
    } else if(score >= 50 && score < 100){
      this.setState({
        lvlTitle:'Apprentice'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "100")
        }
    } else if(score >= 100 && score < 250){
      this.setState({
        lvlTitle:'Officer'
      })
        if (newlvl === true){
            await AsyncStorage.setItem('nextlvl', "250")
          }
    } else if(score >= 250 && score < 500){
      this.setState({
        lvlTitle:'Intermediate'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "500")
        }
    } else if(score >= 500 && score < 1000){
      this.setState({
        lvlTitle:'Elite'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "1000")
        }
    } else if(score >= 1000 && score < 2000){
      this.setState({
        lvlTitle:'Master'
      })
        if (newlvl === true){
          await AsyncStorage.setItem('nextlvl', "2000")
        }
    } else if(score >= 2000 && score < 2500){
      this.setState({
        lvlTitle:'Senior'
      })
 
}
  }
  
  
//pick image from library
  
handleCamera=()=>{
this.props.dispatch(ChangePage(13));
}
   _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
     console.log(result);
     if (!result.cancelled) {
      this.setState({ image: result.uri });
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
      });
       console.log("blob", blob);
//      var data = await fs.readFile(results.uri,'base64');
//      var blob = await Blob.build(data, {type: 'image/jpg;BASE64'}); 
      var ref = storageRef.child('avatar/ava'+this.props.id+'.jpg');
        console.log("ref", ref);
        try {
          var snapshot = await ref.put(blob, {contentType:"image/jpg"});
          console.log(snapshot)
          var url = await snapshot.ref.getDownloadURL();
          
          console.log(url);
          //update user avatar in mysql
          
          var fd= new FormData();
          fd.append("user_id", this.props.id);
          fd.append("avatar", url);

          var resp=await fetch("https://alarmaproj2.herokuapp.com/avatar.php", {
            method:"POST",
            body:fd
          });

          var json=await resp.json();
          //setState for the image
          this.setState({
          image:url,
        })
          
        } catch(err) {
          console.log(err)
        }
       //console.log("snap", snapshot);
//      console.log("fin");
       
    }
  };
    
handleOpacity=()=>{
  this.setState({
    alertOpacity:this.state.opacityChange
  })
}
  
    render() {
    return (
          <View  style={styles.container}> 
          
              
            <View style={styles.topNav}> 
              
            </View>
           <View style={styles.profileBox}>
              <Text style={styles.title}>
                {this.state.un}
              </Text>
            <TouchableOpacity style={styles.touchPic}
             onPress={this._pickImage}>
            
              <Image 
                    source={(this.state.image) ? {uri:this.state.image} : require('../Content/Imgs/ProfilePic.png')}
                    style={styles.profilePhoto}
                    resizeMode="cover"
              />
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchPic}
                onPress={this._pickImage}>
              <LottieView
                source={require('../Content/Imgs/cam.json')}
                style={styles.lottietwo}
                autoPlay
                loop
              />
            </TouchableOpacity>
            </View>
          
          <View style={styles.scoresCont}>
            <TouchableOpacity style={styles.score}>
              <Text style={styles.textScore}>Total {"\n"} {(this.state.scoreT)?this.state.scoreT : 0}</Text>
            </TouchableOpacity>
          </View>
            
            <View style={styles.lvlCont}>
             <TouchableOpacity style={styles.touchPic}
                onPress={this._pickImage}>
              
            </TouchableOpacity>
              <Text style={styles.lvlText}>Level: {(this.state.lvlTitle)? this.state.lvlTitle : 'Recruit'}</Text>
              <LottieView
                source={require('../Content/Imgs/star.json')}
                style={styles.lottie}
                autoPlay
                loop
              />
           </View>
    
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
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    },
    
  locationContainer: {
    top:80,
    width:280,
    height:'auto',
    top:60,
  },

  touch: {
    width: 100,
    height: 100,
    zIndex: 15,
    bottom: 0,
    marginBottom: 0,
  },

  img: {
    width: 45,
    height: 45,
    margin: 10,
    position:'absolute',
    elevation: 2, // Android
  },

  scoresCont: {
    top:50,
    right:30,
    flex:1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    elevation: 2, // Android
  },
  
    score: {
    width:52,
    height:52,
    //marginTop:-40,
    padding:1,
    //justifyContent:'center',
    //alignItems:'center',
    borderRadius: 10,
    borderColor:'#fff',
    borderWidth:1,
},

  rewardCont: {
    width:50,
    height:50,
    top:-120,
    justifyContent: 'center',
    alignItems: 'center',
  },

 editP: {
     width: 35, 
     height: 35, 
     borderRadius: 5, 
     borderColor: '#FFF',
     position:'absolute',
     top: 100,
     left:10,
     alignSelf: 'stretch',
     marginLeft: 70,
     backgroundColor:'rgba(255, 255, 255, 0.6)',
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
    color: 'black',
    },

  textScore: {
    fontSize: 14,
    color: 'black',
    margin:1,
    padding:2,
    textAlign:'center',

    },
  
  profileBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
    top: 20,
    },
  
   touchPic: {
    right: 40,
    top: 30,
    elevation: 2, // Android
    },
    
  title: {
    marginTop: 45,
    fontSize: 24,
//  left: 95,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',//or 'stretch' to put on left side
//  textAlign: 'left',
    marginBottom: -10,
    elevation: 2, // Android
    },
 

  profilePhoto: {
    width: 180, 
    height: 180, 
    borderRadius: 90, 
    borderColor: '#49CBC6',
    borderWidth:2,
    bottom: -10,
    alignSelf: 'stretch',
    marginLeft: 70,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    },

  lvlCont: {
    width:160,
    height:40,
    bottom:80,
    left: 10,
    padding:4,
    zIndex:-21,
    flexDirection: 'row',
    elevation: 2, // Android
  },

  lvlText:{
    position:'relative',
    fontSize: 18,
    fontWeight:'500',
    color: 'black',
    zIndex:-100,
    elevation: 2, // Android
  },

  map: {
    width:280, 
    height:120,
    margin: 25,
    bottom:120,
    position:'absolute',
    borderRadius:10,
    elevation: 2, // Android
  },
    
  locationText: {
    height:80,
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
    borderColor:'#49CBC6',
    borderWidth:2,
    marginBottom: 100,
    borderRadius: 15,
    padding:8,
    elevation: 2, // Android
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
export default connect(mapStateToProps)(Profile);
