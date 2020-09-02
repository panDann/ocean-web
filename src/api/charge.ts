import Request from '@src/utils/fetch'
import { $notify } from '@src/views/container-store';
import { Validator, IRule } from '@src/utils/tool'
import { string } from 'prop-types';

export interface Category {
    id: number
    name: string
    number: string
}

const url = 'charge/category'
const chargeCategoriesRules: IRule = [
    {
        name: [
            { require: true, message: '请输入账务类别名称' },
        ],
        number: [
            { require: true, message: '请输入账务类别编号' },
            { validator: new RegExp(/\d+/g), message: '编号只能是数字' },
        ],
    }
]

export const addCategory = async (data: Record<string, any>) => {

    if (!Validator(data, chargeCategoriesRules)) return false

    let res = await Request<string>(url, { data })
    res && $notify(res + '', 'success')
    return !!res
}


export const getCategory = (page: number, limit: number) => {

    return Request<Category>(url + `?page=${page}&limit=${limit}`, { method: 'GET' })
}


export const deleteCategory = async (id: number) => {
    let res = await Request<string>(url, { data: { id }, method: 'DELETE' })
    res && $notify(res + '', 'success')
    return !!res
}

export interface ChargeToday {
    id: number,
    number: number,
    name: string,
    total: number,
    profit: number,
    createTime: string,
    date?: string,
    rate?: string,
}


const todayUrl = 'charge/today'
const chargeTodayRules: IRule = [
    {

        number: [
            { require: true, message: '请输入账务类别编号' },
            { validator: new RegExp(/\d+/g), message: '编号只能是数字' },
        ],
        total: [
            { require: true, message: '请输入总价' },
            { validator: (value: number) => isNaN(value), message: '编号只能是数字' },
        ],
        profit: [
            { require: true, message: '请输入利润' },
            { validator: (value: number) => isNaN(value), message: '编号只能是数字' },
        ],
    }
]

export const addChargeToday = async (data: Record<string, any>) => {

    if (!Validator(data, chargeTodayRules)) return false

    let res = await Request<string>(todayUrl, { data })
    res && $notify(res + '', 'success')
    return !!res
}


export const getChargeToday = (page: number, limit: number ,startDate:string,endDate:string) => {
    return Request<ChargeToday[]>(todayUrl + `?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`, { method: 'GET' })
}


export const deleteChargeToday = async (id: number) => {
    let res = await Request<string>(todayUrl, { data: { id }, method: 'DELETE' })
    res && $notify(res + '', 'success')
    return !!res
}