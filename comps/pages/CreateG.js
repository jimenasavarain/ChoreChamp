import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Link, Image, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, KeyboardAvoidingView, Clipboard} from 'react-native';
import {connect} from 'react-redux';
import {ChangePage, ChangePasscode, ChangeUserId} from '../../redux/actions';
import {MapView, Asset, Font, ImagePicker} from 'expo';

import Nav from '../Nav'
//npm install --save @react-native-community/react-native-clipboard

class CreateG extends React.Component {

   state={
    predictions:[],
    description:"",
    show:false,
    image:null,
  }

handleChooseG=()=>{
  this.props.dispatch(ChangePage(7));
}
  
  handleCopy=async ()=>{
    await Clipboard.setString(this.state.rannum);
    alert('Copied to Clipboard!');
  }  
  
//DATABASE**********************
    group_name="";
    passcode= "";

    adminNum="2";
  
  handleCreateG=async ()=>{
    if (this.group_name.length === 0 || this.state.description.length === 0){
      alert("Please fill in the inputs");
      return false;
    }
    
    var fd= new FormData();
      
      fd.append("group_name", this.group_name);
      fd.append("passcode", this.state.rannum);
      fd.append("userid", this.props.userid);
      fd.append("location", this.state.description);
    
    var resp=await fetch("https://alarmaproj2.herokuapp.com/group.php", {
      method:"POST",
      body:fd
    });
    
      var json=await resp.json();
      console.log(json);
      if (json.status === true) {
        if (this.props.admin === 1) { 
        admin=adminNum 
        }
     
        this.props.dispatch(ChangePage('Profile'));
        this.props.dispatch(ChangeUserId(this.props.userid, json.id, json.admin));
        
      } else {
        alert ("Something went wrong!");
      }
  }
  
    componentDidMount=()=>{
    this.random();
  };
  
    
handleTextInput= async(text)=>{
    this.setState({
      description:text
    })
    if(text.length < 5) {
      return false;
    }
        var resp = await fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAuzOkzXzY0iM25zYZpvVJ1IHOE-QMEkK8&input="+text);
        console.log(resp);
        
        var json = await resp.json();
        this.setState({
          predictions: json.predictions,
          show:true
        });
        console.log(json);
    }
  
  random =()=>{
    var num ='';
      for (var i=0;i<6; i++){
         var t = 
        Math.round(
          Math.random()*9)
        num+= t
      }
    console.log(num); 
    this.setState({
      rannum:num
    });
  }
  
    handleTouchLoc=(obj)=>{
    this.setState({
      description:obj.description,
      show:false
    })
  }
    
    
    _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
//      var data = await fs.readFile(results.uri,'base64');
//      var blob = await Blob.build(data, {type: 'image/jpg;BASE64'}); 
//      var ref = storageRef.child('avatar/ava'+this.props.id+'.jpg');
//      var snapshot = await ref.put(blob, 'image/jpg');
//      console.log("fin");

      
    }
  };
  render() {
      
var allP = this.state.predictions.map((obj,index)=>{
      return(
        <TouchableOpacity key={index} style={{ borderBottomWidth:1,
                borderLeftWidth:1,
                borderRightWidth:1, 
                borderColor:'#49CBC6', 
                padding:8,
                borderBottomLeftRadius:2,
                borderBottomRightRadius:2,

          }}
         onPress={this.handleTouchLoc.bind(this, obj)}
         >
          <Text style={{ color: '#49CBC6'}}> {obj.description} </Text>
        </TouchableOpacity>
      )
      
    })
    
    if(this.state.show === false) {
      allP = null;
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
        
          <Text style={styles.title}>Create Group</Text>
        </View>
 <KeyboardAvoidingView style={styles.KeyboardView} 
           behavior="padding" enabled>
                      <ScrollView > 
          <View style={styles.middleContainer}>
            
            <TouchableOpacity style={styles.touch} onPress={this._pickImage}>
              <Image 
                   source={(this.state.image) ? {uri:this.state.image} : require('../Content/icons/takepic.png')}
                    style={styles.cameraImg}
                    resizeMode="cover"
                />
             
               </TouchableOpacity>

            <TextInput underlineColorAndroid='transparent'
              style={styles.textInput}
              placeholder="Name The Group"
              onChangeText={(text) => this.group_name=text}
            />

            <Text style={styles.textLabel}>Click to copy the group ID:</Text>
            <TouchableOpacity style={styles.pinBut}
              onPress={this.handleCopy}>
              <Text style={styles.textBut}
              >{this.state.rannum}</Text>
              <Image style={styles.pinImg} source={require('../Content/icons/pin.png')} />
            </TouchableOpacity>
                 <Text style={styles.textLabel}>Type in the location</Text>

                <TextInput underlineColorAndroid='transparent'
                style={styles.locText}
                onChangeText={this.handleTextInput}
                value={this.state.description}
                />

                <View style={styles.dropDown}>

                {allP}

                </View>

                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    region={this.state.initialPosition}
                    >
                </MapView>

            <TouchableOpacity style={styles.createG}
            onPress={this.handleCreateG}>
              <Text style={styles.textBut}>Create</Text>
            </TouchableOpacity>
          </View>
     </ScrollView>
            </KeyboardAvoidingView>
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
    justifyContent: 'flex-start',
  },
    cameraImg: {
    marginLeft:0,
    marginTop: 20,
    width: 70,
    height: 50,
    alignSelf: 'stretch',
  },
  
  pinImg: {
    width: 30,
    height: 30,
    padding:2,
    marginLeft:180,
    marginTop:-25,
    zIndex: 1,
  },
   
});


function mapStateToProps(state){
  return{
    compPage:state.Page.page,
    userid:state.Page.userid,
    admin:state.Page.admin,
  }

}

//export after connecting to redux
export default connect(mapStateToProps)(CreateG);