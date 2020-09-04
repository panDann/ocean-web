import React from 'react';
import { TextField, Grid, Paper, Typography } from '@material-ui/core';
// import { $notify } from '@src/views/container-store';
import LineChart, { LineProps } from '@src/components/charts/line'
import PieChart, { PieProps } from '@src/components/charts/Pie'
import {
    getChargeToday,
    ChargeToday
} from '@src/api/charge'
import { formatDate } from '@src/utils/tool'

import './index.styl'


interface State {
    totalAndProfitProps: LineProps
    totalPieProps: PieProps
    profitPieProps: PieProps
    startDate:  string
    endDate:  string
}
export default class CenteredGrid extends React.Component<any, State> {
    constructor(prop: any) {
        super(prop)
        this.state = {
            startDate:formatDate(new Date(Date.now() - 30 * 86400000), 'MMMM-mm-dd'),
            endDate:formatDate(new Date(), 'MMMM-mm-dd'),
            totalAndProfitProps: {
                legend: ['收入', '利润'],
                height: '323px',
                xAxis: [],
                data: [
                ]
            },
            totalPieProps: {
                title: '收入比例',
                legend: ['收入', '利润'],
                height: '150px',
                data: [
                 
                ]
            },
            profitPieProps: {
                title: '利润比例',
                legend: ['收入', '利润'],
                height: '150px',
                data: [
                ]
            },
        }
    }

    async   getChargeTodayData(page = 1, limit = 1000) {
        const { startDate, endDate } = this.state

        let res = await getChargeToday(page, limit, startDate,formatDate(new Date(endDate).getTime()+86400000))
        this.distributeData(res as any||[])
        return !!res
    }
    distributeData(data: ChargeToday[]) {
        let totalAndProfitPropsData: number[][] = [[], []],
            orderByName: Record<string, { sumTotal: number, sumProfit: number }> = {},
            orderByDate: Record<string, { sumTotal: number, sumProfit: number }> = {}
            data.map(el => {
                el.createTime = formatDate(el.createTime, 'MMMM/mm/dd')
                if (!orderByDate[el.createTime]){
                    orderByDate[el.createTime] = { sumTotal: el.total, sumProfit: el.profit  }
                }else {
                    orderByDate[el.createTime].sumTotal += el.total
                    orderByDate[el.createTime].sumProfit += el.profit
                }
                
                if (!orderByName[el.name]){
                    orderByName[el.name] = { sumTotal: el.total, sumProfit: el.profit }
                }else{
                    orderByName[el.name].sumTotal += el.total
                    orderByName[el.name].sumProfit += el.profit
                }
                return
            })
            
        const { totalPieProps, profitPieProps, totalAndProfitProps } = this.state

        totalAndProfitProps.xAxis = Object.keys(orderByDate)
        Object.values(orderByDate).map(el=>{
            
                totalAndProfitPropsData[0].push(el.sumTotal)
                totalAndProfitPropsData[1].push(el.sumProfit)
        })
        totalAndProfitProps.data = totalAndProfitPropsData

        let nameKeys = totalPieProps.legend = profitPieProps.legend = Object.keys(orderByName)
       
        profitPieProps.data = []
        totalPieProps.data = Object.values(orderByName).map((el, index) => {
            profitPieProps.data.push({ name: nameKeys[index], value: el.sumProfit })
            return { name: nameKeys[index], value: el.sumTotal }
        })
        this.setState( { totalPieProps,profitPieProps, totalAndProfitProps})
    }
    componentWillMount(){
        this.getChargeTodayData()
    }
    onChageDate(type: string, date: string) {
        if (type === 'startDate') {
            this.setState({ startDate: date },this.getChargeTodayData)
        } else {
            this.setState({ endDate: date},this.getChargeTodayData)
        }
        
        // this.getChargeTodayData()
    }
    render() {
        const { startDate, endDate, totalPieProps,
            profitPieProps, totalAndProfitProps } = this.state
        return (
            <div className='root'>

                <Grid container spacing={2}>
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                    <Grid item xs={12} md={12}>
                        <Paper className='paper'>
                            <TextField
                                id="date"
                                label="开始时间"
                                type="date"
                                // value={startDate}
                                onChange={({ target: { value } }) => this.onChageDate('startDate', value)}
                                defaultValue={startDate}
                                // className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="date"
                                label="截止时间"
                                type="date"
                                onChange={({ target: { value } }) => this.onChageDate('endDate', value)}
                                defaultValue={endDate}
                                // value={endDate}
                                className='marginlr1rem'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Paper>

                    </Grid>
                    <Grid item xs={8}>
                        <Paper className='paper'>
                            <Typography className='primary-color weight600' >
                                收入与利润曲线
                            </Typography>
                            <LineChart  {...totalAndProfitProps} />
                        </Paper>
                    </Grid>

                    <Grid item xs={4} key='today-con'>
                        <Paper className='paper'>
                            <PieChart {...totalPieProps} />
                        </Paper>
                        <Paper className='paper margintb1rem'>
                            <PieChart {...profitPieProps} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}