import React, { useState } from 'react';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import { TextField, Card, Button, FormControlLabel, Checkbox } from '@material-ui/core';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { tokenStorage, userInfoStorage, isRecordPassStorage, getLoginMsgStorage, updateLoginMsgStorage } from '@src/views/consts/localStorage-variables';
import { homePath } from '@src/views/routes/path.ts'
import { login, User } from '@src/api/login'
import Store from '@src/views/container-store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2rem 0',
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        card: {
            width: '400px',
            height: '350px',
        }
    }),
);

export default function BasicTextFields() {
    const classes = useStyles();
    const loginMsg = getLoginMsgStorage()
    let [state, setState] = useState({
        isRecordAccount: !!localStorage.getItem(isRecordPassStorage),
        form: {
            username: loginMsg.username,
            password: loginMsg.password
        }
    })
    const handelLogin = async () => {
        let res = await login(state.form)
        if (res) {
            localStorage.setItem(tokenStorage, (res as User).token)
            localStorage.setItem(userInfoStorage, JSON.stringify({ username: (res as User).username, role: (res as User).role }))
            Store.hasLogined = true

            if (state.isRecordAccount) updateLoginMsgStorage(state.form)

            location.hash = '#' + homePath
        }
    }
    return (
        <Card onKeyDownCapture={({ keyCode }: React.KeyboardEvent) => keyCode == 13 && handelLogin()} className={`absolute-center flex-column ${classes.card}`}>
            <form className={` flex-column ${classes.root}`} autoComplete="on">
                <TextField id="username" autoFocus      
                 value={state.form.username} 
                 onChange={({ target: { value } }) =>  { setState({ ...state, form:{...state.form,username:value} })}} required
                 label="用户名" variant="outlined" />
                 
                <TextField id="password" type='password'
                 value={state.form.password}  
                 onChange={({ target: { value } }) => { setState({ ...state, form:{...state.form,password:value} })}} required
                 label="密码" variant="outlined" />
            </form>
            <div className='flex-row justify-between width50'>
                <Button variant="contained" size='large' color="primary" onClick={handelLogin} >登录</Button>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.isRecordAccount}
                            onChange={({ target: { checked } }) => { setState({ ...state, isRecordAccount: checked }), localStorage.setItem(isRecordPassStorage, checked ? '1' : '') }}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="记住账号"
                />
            </div>
        </Card>
    );
}
