
import {chargePath,chargeStatisticalPath} from '@src/views/routes/path'
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
 
export const iconProps: any = {
    fontSize: 'small',
    classes:{
        root:'icon-color'
    }
} 
export const items = [
    {
        icon: {
            tag: DraftsIcon,
        },
        label: '记账',
        path: chargePath
    },
    {
        icon: {
            tag: SendIcon,
        },
        label: '账务统计',
        path: chargeStatisticalPath
    },
]
export const path2index = new Map([
    [chargePath,0],
    [chargeStatisticalPath,1],
])

const menuFocusClass = 'active-item'
export const menuFocusMap =  new Map([
    [chargePath,menuFocusClass],
    [chargeStatisticalPath,menuFocusClass],
])