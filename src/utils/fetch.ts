

// import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {$loading,$notify} from '@src/views/container-store';
import {obj2formdata} from './tool'
import {clearUserStorage} from '@src/api/login'
import { tokenStorage } from '@src/views/consts/localStorage-variables';

const host = process.env.NODE_ENV == 'development' && `http://localhost:9002/`
const commonTag = 'ocean-web/'

interface ICommonRes<T = any> {
    data: T
    message: string
    code: number
}
interface IConfig {
    headers?:Headers,
    data?:Record<string,any>
    body?:BodyInit
    method?:'GET'|'POST'|'DELETE'|'DELETE'|'OPTION'
}
// interface ResponeCode {
//     success: 10000,
//     loginOverdue: 10011,
//     noPermisson: 10021,
//     error: 10031,
//     notLogin: 10041,
// }

let responeCode = {
    success: 10000,
    loginOverdue: 10011,
    noPermisson: 10021,
    error: 10031,
    notLogin: 10041,
}
export default function request<T>(url: string, option?:IConfig) {
    $loading(true)
    const configs:RequestInit = {
        method: 'POST',
        body: obj2formdata(option.data||{}),
        headers: new Headers({
            // 'content-type': 'application/json;charset=utf-8',
            //  'Content-Type':' multipart/form-data',
            //  'Content-Type': 'application/x-www-form-urlencoded',
            token: localStorage.getItem(tokenStorage) || '',
        }),
        ...option,
        // credentials: 'include',
        // mode: 'cors'
    }
    
    if(configs.method == 'GET')delete configs.body

    return fetch(host + commonTag + url,configs)
        .then((data) => {
            return data.json()
        })
        .then((data: ICommonRes<T>)=> {
            $loading(false)
            return ckeckRes<T>(data)
        })
        .catch(err => {
            console.log(err);

            $loading(false)
            $notify('网络请求出错')
        })
}

function ckeckRes<T>(data: ICommonRes<T>): boolean | T {
    let { code } = data,
        errRes = false
    switch (code) {
        case responeCode.success:
            return data.data
        case responeCode.loginOverdue:
            $notify('登录过期')
            clearUserStorage()
            return errRes
        case responeCode.error:
            $notify(data.message)
            return errRes
        case responeCode.noPermisson:
            $notify('无权限访问')
            return errRes
        case responeCode.notLogin:
            $notify('未登录')
            clearUserStorage()
            return errRes
        default: return errRes
    }
}