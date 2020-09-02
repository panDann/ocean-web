import Request from '@src/utils/fetch'
import { tokenStorage,userInfoStorage } from '@src/views/consts/localStorage-variables';
import {$notify,$setHasLogined} from '@src/views/container-store';
import {Validator,IRule} from '@src/utils/tool'

export interface User {
    role: string
    token: string
    username: string
}

const loginRules:IRule = [
    {
        username:[
            {require:true,message:'请输入用户名'}
        ],
        password:[
            {require:true,message:'请输入密码'}
        ],
    }
]
export const login = (data:Record<string,any>) => {

    if(!Validator(data,loginRules))return

    return Request<User>(`user/login`, {data})
}

export const clearUserStorage = () => {
    localStorage.setItem(tokenStorage,'')
    localStorage.setItem(userInfoStorage,'')
    $setHasLogined(false)
}

export const logout = async () => {
     let res = await Request<string>(`user/logout`,{data:{}})
     
     if(res) {
        $notify(res as string,'success')
         clearUserStorage()
     }
}