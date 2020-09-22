import React from 'react';
import { observer, inject } from 'mobx-react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@src/views/login'
import App from '@src/views/app-con/app'
import Routes from '@src/views/routes'
import { homePath, loginPath } from '@src/views/routes/path.ts'
import LinearProgress from '@material-ui/core/LinearProgress';
import Notify from '@src/components/notify'

interface IState {
    redirect: any
}

@inject('store')
@observer
class Con extends React.Component<any, IState> {
    constructor(prop: any) {
        super(prop)
        this.state = {
            redirect: <Redirect to={loginPath} />
        }
    }
    notifyRef = React.createRef()

    componentWillMount() {
        // console.log(hasLogined);

        // console.log(history);
        // location.hash=+
        // history.push(hasLogined ? homePath: loginPath)
    }
    render() {
        const { store: { isLoading, hasLogined, notifyShow } }: any = this.props

        return <HashRouter>
            {isLoading && <LinearProgress className='fixed-progerss' />}
            {notifyShow && <Notify />}

            <Switch>
                <Route path={loginPath} exact component={Login} />

                {hasLogined ? <React.Fragment>
                    <Route path={homePath} render={() =>
                        <App>
                            {
                                Routes.map((el, index) => <Route {...el} key={index} exact  />)
                            }
                        </App>
                    } />
                    {location.hash == '#/'&&<Redirect to={homePath} />}
                </React.Fragment> : <Redirect to={loginPath} />}

            </Switch>
        </HashRouter>

    }
    componentDidMount() {
        const { store: { hasLogined } }: any = this.props

        let redirect = <Redirect to={hasLogined ? homePath : loginPath} />
        this.setState({ redirect })
    }

}

export default (Con) 