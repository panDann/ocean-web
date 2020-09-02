import React,{useRef} from 'react';
import Echarts from 'echarts'
import { PieProp,
    createPieOption} from './options'
import './index.styl'

    
export type  PieProps = PieProp & {
    width?:string
    height?:string
}
export default function LineChart(param: PieProps) {
  
    const {width='100%',height='300px'} = param
    const ref = useRef(null)
    setTimeout(() => {
       let pieInit =  Echarts.init(ref.current)
       pieInit.setOption(createPieOption(param))
       window.addEventListener('resize',()=>{
        pieInit.resize()
       })
    }, 0);
    return (
        <div ref={ref} style={{width,height}}>
        </div>
    )
}