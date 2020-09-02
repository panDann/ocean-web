import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ConStore from '@src/views/container-store'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notify() {
    const useStyles = makeStyles((theme: Theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    const classes = useStyles()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        ConStore.notifyShow = false
    }

    return <div className={classes.root} >
    <Snackbar open={ConStore.notifyShow}
     anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={ConStore.notifyType}>
            {ConStore.notifyMsg}
        </Alert>
    </Snackbar>
    </div>
}


