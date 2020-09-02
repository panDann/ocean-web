import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter,Redirect } from 'react-router-dom'
import {
    iconProps,
    items,
} from './consts'
// import {homePath} from '@src/views/routes/path'

import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageRoundedIcon from '@material-ui/icons/FirstPageRounded';
import RightHeader from '@src/views/app-con/conponents/right-header'
import { isFoldMenuStorage,lastPathStorage } from '@src/views/consts/localStorage-variables'
// import Grow from '@material-ui/core/Grow';
import { $menuFoldWidth, $menuWidth } from "@src/styles/variables.json";

import {pageTitleMap} from '@src/views/routes/path'
import './app.styl'

interface IState {
    pathname:string
    isFoldMenu: boolean
    isHiddenBar: boolean
    appBarTitle: string
}

let  scrollTimer: any = 0

class App extends React.Component<any, IState> {
    constructor(porp: any) {
        super(porp)
        const { history:{location:{pathname}} } = porp
        this.state = {
            pathname,
            isFoldMenu: !!localStorage.getItem(isFoldMenuStorage) || false,
            isHiddenBar: false,
            appBarTitle:pageTitleMap.get(pathname)||'标题'
        }
    }
    componentWillMount(){
        const {history:{location:{pathname}} } = this.props
        items.findIndex(el=>el.path == pathname) == -1 && this.leapTo(localStorage.getItem(lastPathStorage) ||items[0].path)
    }
    
    leapTo(pathname:string) {
        const { history } = this.props
        this.setState({pathname,appBarTitle:pageTitleMap.get(pathname)})
        history.push(pathname)
    }
    handleBar() {

        if (scrollTimer) clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
            this.setState({ isHiddenBar: document.getElementById('rightCon').scrollTop == 0 })
        }, 100);

    }
    updatePathname(pathname:string){
        this.setState({pathname})
    }
    render(h = React.createElement) {
        // const {children} = this.props
        const {  isFoldMenu,appBarTitle,pathname, isHiddenBar } = this.state
        return (
            <div className='flex-row'>
                <Paper className='side_con border-box' style={{ width: isFoldMenu ? $menuFoldWidth : $menuWidth }}>
                    <MenuList  variant='selectedMenu'>
                        {items.map((el, index: number) =>
                            <MenuItem
                                key={el.path} onClick={() => this.leapTo(el.path)}
                                classes={{ root:pathname==el.path&&'active-item'}}
                            >
                                <ListItemIcon>
                                    {
                                        h(el.icon.tag, iconProps)
                                    }
                                </ListItemIcon>
                                <Typography variant="inherit">{el.label}</Typography>
                            </MenuItem>)}
                    </MenuList>
                    <IconButton className='fold-btn' onClick={() => (this.setState({ isFoldMenu: !isFoldMenu }), localStorage.setItem(isFoldMenuStorage, !isFoldMenu ? '1' : ''))}>
                        {h(isFoldMenu ? LastPageIcon : FirstPageRoundedIcon, iconProps)}
                    </IconButton>
                </Paper>
                <div id='rightCon' className='right-con' onScroll={this.handleBar.bind(this)}>
                    <RightHeader title={appBarTitle} className={`${!isHiddenBar && 'is-scorlling'}`} />
                    <div className='route-view paddinglr1rem'>
                            {this.props.children}
                    </div>
                </div>
            </div>

        );
    }
    componentWillUnmount(){
        const { pathname,} = this.state
        localStorage.setItem(lastPathStorage,pathname)
    }

}

export default withRouter(App)