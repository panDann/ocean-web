
import Charge from '@src/views/charge'
import * as paths from './path'
import ChargeStatistical from '@src/views/charge-statistical'

export default [
    {
        path: paths.chargePath,
        component: Charge
    },
    {
        path: paths.chargeStatisticalPath,
        component: ChargeStatistical
    },
]
