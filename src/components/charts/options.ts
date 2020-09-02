import echarts, { EChartOption } from 'echarts'
import {$primaryColor,$warningColor,$errorColor,$secondaryColor,$successColor}  from '@src/styles/variables.json'
const color = [$primaryColor,$warningColor,$errorColor,$secondaryColor,$successColor]

export interface LineProp {
    title?: string
    legend: string[]
    xAxis: string[]
    data: number[][]
}

export const createLineOption = ({ title, legend, xAxis, data }: LineProp): EChartOption =>
    ({
        title: {
            text: title || ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: legend
        },
        color,
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxis
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: legend.map((el, index) =>
            ({
                name: el,
                type: 'line',
                // stack: '总量',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 1,
                        y: 0,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: $primaryColor // 0% 处的颜色
                        }, {
                            offset: 1, color: $warningColor // 100% 处的颜色
                        }],
                    }
                },
                data: data[index]
            }))

    })


export interface PieProp {
    title?: string
    legend: string[]
    data: {name:string,value:number}[]
}

export const createPieOption = ({ title, legend, data }: PieProp): EChartOption =>
    
    
({
        title: {
            text: title||'',
            textStyle:{
                color:$primaryColor, 
                fontSize:14 
              },
            // left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: legend,
            // selected: data.selected
        },
        color,
        series: [
            {
                name: '名称',
                type: 'pie',
                radius: ['50%','70%'],
                center: ['40%', '60%'],
                // label: {
                //     position: 'inner'
                // },
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })