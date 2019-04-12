//update the state variable
const pageDefault = {
  page:1,
  userid:null,
  group_id:null,
  score:0,
  avatar:null,
  image:null,
  admin:1,
  rewardid:"",
  home:1,
  loading:false,
};

export function Page(state = pageDefault, action){
  let obj = Object.assign({}, state);
  
  switch(action.type) {
    case "CHANGE_PAGE":
        //same as setState
        obj.page = action.curpage;
        return obj;
      
     case "CHANGE_USERID":
      obj.userid=action.userid;
      obj.group_id=action.group_id;
      obj.admin=action.admin;
      obj.score=action.score;
      obj.home=action.home;
      obj.avatar=action.avatar;
      return obj;
      

      
    case "CHANGE_PASSCODE":
      obj.group_name=action.group_name;
      obj.passcode=action.passcode;
      return obj;
      
    case "CHANGE_LOAD":
      obj.loading=action.loading;
      return obj;
      
    default:
      return state;
  }
}

//for storing global background color state variable
const bgDefault = {
  bgcolor:"FFFFFF"
}

export function Background(state = bgDefault, action){
  let obj = Object.assign({}, state);
  
  switch(action.type) {
    case "CHANGE_BG":
        //same as setState
        obj.bgcolor = action.bgcolor;
        return obj;
      
    default:
      return state;
  }
}