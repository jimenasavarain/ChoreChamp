//build functions to change the global state
export function ChangePage(page){
  return {
    type:"CHANGE_PAGE",
    curpage:page
  }
}

export function ChangeUserId(userid, group_id, admin, score, home, avatar){
  return{
    type:"CHANGE_USERID",
    userid:userid,
    group_id:group_id,
    admin:admin,
    score:score,
    home:home,
    avatar:avatar,
  }
}

export function ChangePasscode(group_name, passcode){
  return{
    type:"CHANGE_PASSCODE",
    group_name:group_name,
    passcode:passcode,
  }
}

export function ChangeLoad(loading){
  return{
    type:"CHANGE_LOAD",
    loading:loading,
  }
}