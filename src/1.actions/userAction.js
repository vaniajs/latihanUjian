import axios from 'axios';
import { urlApi } from './../support/urlApi';
import Cookie from 'universal-cookie';

const objCookie = new Cookie()
export const onLogin = (username,password) => {
    return(dispatch) =>{
        // INI UNTUK MENGUBAH LOADING MENJADI TRUE
        dispatch({
            type: 'LOADING',
        })

        // GET DATA DARI FAKE API JSON SERVER
        axios.get( urlApi + '/users',{
            params:{username:username,
                    password,
                    }}) // kalo paramater sm api namanya sama, bisa ditulis password aja, sama aja kaya password:password
        
        // KALO BERHASIL NGE-GET, DIA MASUK THEN    
        .then((res) => {
            console.log(res)
        // IF USERNAME DAN PASSWORD SESUAI MAKA RES.DATA ADA ISINYA    
            if(res.data.length>0){
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload : 
                    {
                        username: res.data[0].username,
                        role: res.data[0].role,
                        id: res.data[0].id
                    }
            })}
            else{
                dispatch({
                    type: 'USER_NOT_FOUND',
                })
            }
        })
        .catch((err) => {
            dispatch({
                type:"SYSTEM_ERROR",
            })
        }
        )
    }
    
}


export const keepLogin = (cookie) => {
    return(dispatch) => {
        axios.get(urlApi+'/users',{ params: {username: cookie}})
        .then((res) => {
            if(res.data.length>0){
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        username: res.data[0].username,
                        role: res.data[0].role,
                        id: res.data[0].id
                    }
                })
            }
        
        })
        .catch((err)=> console.log(err))
    }
    
}

export const resetUser = () => {
    return{
        type: 'RESET_USER',
    }
}

export const userRegister = (uname,pass,email,tel) => {
    return(dispatch)=>{
        dispatch({
            type: 'LOADING'
        })
        var newData = {username: uname, password: pass, email: email, phone: tel}
        axios.get(urlApi + '/users?username=' + newData.username)
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type: 'USERNAME_NOT_AVAILABLE'
                })
            }
            else{
                axios.post(urlApi+'/users',newData)
                .then((res)=>dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: uname
                },
                    objCookie.set('userData',uname,{path:'/'})
                ))
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>dispatch({
           type: "SYSTEM_ERROR"
        }))
    }
}

export const googleLogin = (email) => {
    return(dispatch)=>{
        axios.get(urlApi+'/users?username=' + email)
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data[0]
                })
            }
            else{
                axios.post(urlApi+'/users',{
                    username: email,
                    role: 'user',
                })
                .then((res)=>{
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data
                    },
                    objCookie.set('userData',email,{path:'/'})
                    )

                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}