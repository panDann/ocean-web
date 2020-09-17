import React,{useRef} from 'react';
import Line from '@src/components/echarts'
import { createLineOption,LineProp } from './options'
import './index.styl'

    
export type  LineProps = LineProp & {
    width?:string
    height?:string
}
export default function LineChart(param: LineProps) {
    const {width='100%',height='300px'} = param
    const ref = useRef(null)
    setTimeout(() => {
        let lineInit =  Line.init(ref.current)
        lineInit.setOption(createLineOption(param))
    
        window.addEventListener('resize',()=>{
         lineInit.resize()
           })
    }, 0);
    return (
        <div ref={ref} style={{width,height}}>
        </div>
    )
}