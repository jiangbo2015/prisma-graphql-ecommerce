import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import CategoryIcon from '@material-ui/icons/Category'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { SvgIconProps, Snackbar } from '@material-ui/core'
import { useReactiveVar } from '@apollo/client'
import { toastVar } from './client'

import Home from './containers/Home'
import Collection from './containers/Collection'
import Product from './containers/Product'
import Login from './containers/Login'

export interface IMenu {
    title: string
    path: string
    icon: React.FC<SvgIconProps>
    component: React.FC
    children?: IMenu[]
}
export const menus: IMenu[] = [
    {
        title: 'Colection',
        path: '/collection',
        icon: CategoryIcon,
        component: Collection,
        // children: [
        //     {
        //         title: 'ColectionAdd',
        //         path: '/collection-add',
        //         icon: CategoryIcon,
        //         component: Collection,
        //     },
        // ],
    },
    {
        title: 'Product',
        path: '/product',
        icon: FavoriteIcon,
        component: Product,
    },
    {
        title: 'home',
        path: '/',
        icon: HomeIcon,
        component: Home,
    },
]

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
