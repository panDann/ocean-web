import React from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@src/views/login'
import App from '@src/views/app-con/app'
import Routes from '@src/views/routes'
import { homePath, loginPath } from '@src/views/routes/path.ts'
import LinearProgress from '@material-ui/core/LinearProgress';
import Notify from '@src/components/notify'


@inject('store')
@observer
export default class Container extends React.Component {
    notifyRef = React.createRef()
 
    render() {
        const { store: { isLoading, hasLogined, notifyShow } }: any = this.props
        return  <HashRouter>
                    {isLoading && <LinearProgress className='fixed-progerss' />}
                    {notifyShow && <Notify />}
                   
                    <Switch>
                        <Route path={loginPath} exact component={Login} />
                        {hasLogined ? 
                        <Route path={homePath} render={() =>
                            <App>
                                {
                                    Routes.map((el, index) => <Route  path={el.path} key={index} exact component={el.component} />)
                                }
                            </App>
                        } />
                        :<Redirect to={loginPath} />}
                    </Switch>
        </HashRouter>
      
    }
    // componentDidMount() {
    //     // console.log(111,this.notifyRef.current);

    // }

}

