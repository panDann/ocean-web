import { observable, action } from 'mobx';
import  {  Color } from '@material-ui/lab/Alert';
import { tokenStorage } from '@src/views/consts/localStorage-variables';

// let notifyTimer:any = 0 

export class ConStore {
    @observable isLoading = false
    // @observable isNotify = false
    @observable hasLogined = !!localStorage.getItem(tokenStorage)
    @observable notifyMsg = ''
    @observable notifyType:Color = 'error'
    @observable notifyShow = false

    @observable pageTitle = ''

    @action showLoading = ()=>{
        this.isLoading = true
    }
    @action hiddenLoading = ()=>{
        this.isLoading = false
    }
    @action showNotify = (msg:string,type?:Color )=>{
        this.notifyMsg = msg
        this.notifyShow = true
        this.notifyType = type || 'error'
    }
   
    // @action notifyClose = ()=>{
    //     this.notifyShow = false
    // }
   
}

const Store  = new ConStore()

export default Store

export const $notify = (msg:string,type?:Color)=>{
    Store.showNotify(msg,type)
}
export const $loading = (val:boolean)=>{
    Store.isLoading = val
}

export const $setHasLogined = (val:boolean)=>{
    Store.hasLogined = val
}
export const $setPageTitle = (val:string)=>{
    Store.pageTitle = val
}