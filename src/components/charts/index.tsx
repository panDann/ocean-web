import React from 'react';
import { Paper } from '@material-ui/core';
import './index.styl'
interface IPorps {
    header:React.ReactElement|string
    color?:string
    children?:any
}
export default function ConvexCard({header='',color='primary',children}:IPorps) {

    return (
        <React.Fragment>
            <Paper className='convex-con'>
                <div className={`convex-common convex-${color}`}>
                    {header}
                </div>
                {children}
            </Paper>
        </React.Fragment>
    )
}