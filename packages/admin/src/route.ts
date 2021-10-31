import { SvgIconProps } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import CategoryIcon from '@material-ui/icons/Category'
import FavoriteIcon from '@material-ui/icons/Favorite'

import Home from './containers/Home'
import Collection from './containers/Collection'
import Product from './containers/Product'

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
