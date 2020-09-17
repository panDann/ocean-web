
import Charge from '@src/views/charge'
import * as paths from './path'
import ChargeStatistical from '@src/views/charge-statistical'
// import Login from '@src/views/login'
// import App from '@src/views/app-con/app'

export default [
    {
        path: paths.chargePath,
        component: Charge,
    },
    {
        path: paths.chargeStatisticalPath,
        component: ChargeStatistical
    },
    
    // {
    //     path: paths.loginPath,
    //     component: Login
    // },
    // {
    //     path: paths.homePath,
    //     component: App,
    //     children:[
    //         {
    //             path: paths.chargePath,
    //             component: Charge,
    //         },
    //         {
    //             path: paths.chargeStatisticalPath,
    //             component: ChargeStatistical
    //         },
    //     ]
    // },
]
