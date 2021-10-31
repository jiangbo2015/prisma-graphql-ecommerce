import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Snackbar } from '@material-ui/core'
import { useReactiveVar } from '@apollo/client'
import { toastVar } from './client'

import Login from './containers/Login'
import { menus } from './route'

export default function App() {
    const toast = useReactiveVar(toastVar)
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    {menus.map((menu) => (
                        <Route path={menu.path}>
                            <menu.component />
                        </Route>
                    ))}
                </Switch>
            </Router>
            <Snackbar
                open={toast.open}
                message={toast.message}
                autoHideDuration={3000}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                onClose={() => toastVar({ open: false, message: '' })}
            ></Snackbar>
        </React.Fragment>
    )
}
