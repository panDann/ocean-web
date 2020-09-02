
// import {isFoldMenuStorage} from '@src/views/consts/localStorage-variables'
export const isFoldMenuStorage = 'isFoldMenuStorage'
export const tokenStorage = 'tokenStorage'
export const userInfoStorage = 'userInfoStorage'
export const loginMsgStorage = 'loginMsgStorage'
export const isRecordPassStorage = 'isRecordPassStorage'
export const lastPathStorage = 'lastPathStorage'


export interface User {
    username:string
    password:string
}
export const updateLoginMsgStorage = (user:User) =>{
    let loginMsg = JSON.parse(localStorage.getItem(loginMsgStorage)||'{}')
    loginMsg[user.username] = user
    localStorage.setItem(loginMsgStorage,JSON.stringify(loginMsg))
}

export const getLoginMsgStorage = (username?:string):User =>{
    let loginMsg:Record<string,User> = JSON.parse(localStorage.getItem(loginMsgStorage)||'{}'),
        [firstKey] = Object.keys(loginMsg) 

    if(firstKey) {
        if(loginMsg[username])
           return loginMsg[username]
        else 
           return loginMsg[firstKey]
    }
    return {
        username:'',
        password:''
    }
    // localStorage.setItem(loginMsgStorage,JSON.stringify(loginMsg))
}