const INITIAL_STATE = {id : 0, username : "", password: "", error: "", loading:false, role:""}

export default (state=INITIAL_STATE,action) => {
    if(action.type==='LOGIN_SUCCESS'){
        return {...INITIAL_STATE,username:action.payload.username, role:action.payload.role, id:action.payload.id}
    }else if(action.type==='LOADING'){
        return {...INITIAL_STATE,loading:true}
    }else if(action.type==='USER_NOT_FOUND'){
        return{...INITIAL_STATE,error:"Username atau password salah."}
    }else if(action.type==='SYSTEM_ERROR'){
        return{...INITIAL_STATE,error:"System Error. Try again later."}  
    }else if(action.type==='RESET_USER'){
        return INITIAL_STATE
    }else if(action.type==='USERNAME_NOT_AVAILABLE'){
        return{...INITIAL_STATE, error: "Username not available"}
    }else{
        return state 
    }
}

// kalo pake switch case

// export default (state=INITIAL_STATE,action) => {
//     switch (action.type){
//         case 'LOGIN_SUCCESS':
//             return {...INITIAL_STATE,username: action.payload.username, role: action.payload.role}
//         case 'LOADING':
//             return{...INITIAL_STATE,loading:true}
//         case 'USER_NOT_FOUND':
//             return{...INITIAL_STATE,error:"Username atau password salah."}
//         case 'SYSTEM_ERROR':
//             return{...INITIAL_STATE,error:"System Error. Try again later."}
//         case 'RESET_USER':
//             return INITIAL_STATE
//         case 'USERNAME_NOT_AVAILABLE':
//             return {...INITIAL_STATE, error: "Username not available"}
//         default:
//             return state
//     }
// }