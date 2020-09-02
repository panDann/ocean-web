import React from 'react';
// import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TextField, Button, Grid, Paper, Dialog, IconButton } from '@material-ui/core';
import ConvexCard from '@src/components/convex-card'
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { $notify } from '@src/views/container-store';

import { formatDate } from '@src/utils/tool'

import {
    getCategory, addCategory, deleteCategory, Category,
    addChargeToday,
    getChargeToday,
    deleteChargeToday,
    ChargeToday
} from '@src/api/charge'
import ChargeTable from './components/table'
import {
    Categories,
    fieldTypes,
    fieldLabels,
    Form,
    ChargeForm
} from './types'
import './index.styl'


interface State {
    chargeCategories: Category[]
    todayCharges: ChargeToday[]
    form: Form
    chargeForm: ChargeForm
    dialogVisible: boolean
}
export default class CenteredGrid extends React.Component<any, State> {
    constructor(prop: any) {
        super(prop)
        this.state = {
            chargeCategories: [],
            todayCharges: [],
            form: {
                name: '',
                number: ''
            },
            chargeForm: {
                total: '',
                profit: '',
                number: '',
                name: ''
            },
            // ...DialogContent(this.handleSubmit)
            dialogVisible: false
        }
        this.handleChargeFormSubmit.bind(this)
    }
    componentWillMount() {
        this.getCategoryData()
        this.getChargeTodayData()
    }
    async   getCategoryData(page = 1, limit = 30) {
        let res: any = await getCategory(page, limit)
        this.setState({ chargeCategories: res || [] })
        return !!res
    }

    async  handleSubmit() {
        const { form } = this.state
        await addCategory(form) && this.getCategoryData() && this.setState({ dialogVisible: false })

    }
    async deleteChargeCategory(id: number) {
        await deleteCategory(id) && this.getCategoryData()
    }
    // charge today
    async   getChargeTodayData(page = 1, limit = 100) {
        let date = new Date()
        let res: any = await getChargeToday(page, limit, formatDate(date, 'MMMM/mm/dd'),
                                            formatDate(new Date(date.getTime() + 86400000), 'MMMM/mm/dd'))
        this.setState({ todayCharges: res || [] })
        return !!res
    }

    async  handleChargeFormSubmit() {
        const { chargeForm, chargeCategories } = this.state
        if (!matchCategoryName(chargeForm, chargeCategories)) return

        await addChargeToday(chargeForm) && this.getChargeTodayData()
            && this.setState({ chargeForm: { name: '', number: '', total: '', profit: '' } })
    }
    async deleteChargeTodayItem(id: number) {
        await deleteChargeToday(id) && this.getChargeTodayData()
    }

    render() {
        const { chargeCategories, chargeForm, todayCharges, dialogVisible, form } = this.state
        return (
            <div className='root'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper className='paper'>
                            <Grid container justify='space-around' alignItems='center'>
                                {fieldTypes.map((el, index) => <Grid item xs={3} key={el} >
                                    <TextField value={chargeForm[el]}
                                        onChange={({ target: { value } }) => this.setState({ chargeForm: { ...chargeForm, [el]: value } })}
                                        onKeyUp={() => transpondEnter(this, el)}
                                        id={'field-' + el} label={fieldLabels[index]} variant="outlined" />
                                </Grid>)}
                                <Grid item xs={2} >
                                    <Button color='primary' variant="outlined" onClick={this.handleChargeFormSubmit.bind(this)} >添加</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} key='category-con'>
                        <ConvexCard header={
                            <Grid className='charge-cat-con'>
                                账务类别
                            <IconButton className='charge-cat-add' onClick={() => this.setState({ dialogVisible: true })}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Grid>
                        } color='primary'>
                            {
                                chargeCategories.map(el => <Alert key={el.id} className='margintb10' severity='info' icon={<span>{el.number}</span>} action={<IconButton onClick={() => this.deleteChargeCategory(el.id)}>
                                    <CloseIcon />
                                </IconButton>}>
                                    {el.name}</Alert>)
                            }
                        </ConvexCard>
                    </Grid>
                    <Dialog open={dialogVisible} aria-labelledby="form-dialog-title">
                        <div className='padding1rem'>
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>

                            <TextField
                                autoFocus
                                margin="dense"
                                value={form.number}
                                id="number"
                                onChange={({ target: { value } }) => this.setState({ form: { ...form, number: value } })}
                                label="编号"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                value={form.name}
                                id="name"
                                onChange={({ target: { value } }) => this.setState({ form: { ...form, name: value } })}
                                label="名称"
                                fullWidth
                            />
                        </div>
                        <DialogActions>
                            <Button onClick={() => this.setState({ dialogVisible: false })} color="primary">
                                取消
                            </Button>
                            <Button onClick={this.handleSubmit.bind(this)} color="primary">
                                提交
                          </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid item xs={8} key='today-con'>
                        <ConvexCard header='今日记账' color='success'>
                            <ChargeTable rows={todayCharges} deleteItem={this.deleteChargeTodayItem.bind(this)} />
                        </ConvexCard>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
function transpondEnter(_this: any, type: string) {
    const refs: Categories = {
        number: null,
        total: null,
        profit: null,
    }
    const refTypes = Object.keys(refs)
    let temkey = ''
    for (temkey in refs) {
        refs[temkey] = document.getElementById('field-' + temkey)
    }
    let e: any = window.event
    if (e.keyCode && e.keyCode === 13) {
        switch (type) {
            case refTypes[0]:
                const { chargeForm, chargeCategories } = _this.state
                if (!matchCategoryName(chargeForm, chargeCategories)) return
                refs[refTypes[1]].focus()
                break
            case refTypes[1]:
                refs[refTypes[2]].focus()
                break
            case refTypes[2]:
                _this.handleChargeFormSubmit()
                refs[refTypes[0]].focus()
                break
            default: break
        }
    }
}
function matchCategoryName(chargeForm: ChargeForm, chargeCategories: Category[]) {
    let matchNumber = chargeCategories.find((el: Category) => el.number == chargeForm.number)
    if (matchNumber) {
        chargeForm.name = matchNumber.name
    } else {
        $notify('无此编号账务')
        return false
    }
    return true
}

