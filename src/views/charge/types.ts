import { string } from "prop-types"

 export interface Categories {
    [category: string]: HTMLElement
    total: HTMLElement
    profit: HTMLElement
}
 
export interface Form {
    number: string|number
    name: string
} 
export interface ChargeForm {
    [number:string]: string|number
    total: string|number
    name: string
    profit: string|number
} 


export const fieldTypes=['number','total','profit']

export const fieldLabels=['账务类别编号','收入','利润']