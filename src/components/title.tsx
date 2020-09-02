import * as React from 'react'
import './title.styl'
interface ITitleProp {
    text: string
}
export default function Title({ text }: ITitleProp) {
    return <h1 className='con'>{text}</h1>
   
}  