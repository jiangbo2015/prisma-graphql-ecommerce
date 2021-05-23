import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './containers/Home'
import Collection from './containers/Collection'
import Product from './containers/Product'
import HomeIcon from '@material-ui/icons/Home'
import CategoryIcon from '@material-ui/icons/Category'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { SvgIconProps } from '@material-ui/core'

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
        children: [
            {
                title: 'ColectionAdd',
                path: '/collection-add',
                icon: CategoryIcon,
                component: Collection,
            },
        ],
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
    return (
        <Router>
            <Switch>
                {menus.map((menu) => (
                    <Route path={menu.path}>
                        <menu.component />
                    </Route>
                ))}
            </Switch>
        </Router>
    )
}
