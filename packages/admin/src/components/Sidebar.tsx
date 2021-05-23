import { Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { menus, IMenu } from '../App'

type SidebarProps = {
    drawerWidth: number
}

type SubMenuItemProps = {
    item: IMenu
    depth: number
}

const useStyles = makeStyles<Theme, SidebarProps>((theme) => ({
    drawer: (props) => ({
        width: `${props.drawerWidth}px`,
    }),
    drawerPaper: (props) => ({
        width: `${props.drawerWidth}px`,
    }),
    listItemWrapper: {
        '& a': {
            'text-decoration': 'none',
        },
    },
    listItem: {
        paddingLeft: 0,
    },
    listItemActive: {
        color: `${theme.palette.primary.main}`,
    },
    icon: {
        marginRight: '10px',
    },
}))

const SubMenuItem = ({ item, depth }: SubMenuItemProps) => {
    const [open, setOpen] = useState(window.location.pathname.includes(item.path))
    const history = useHistory()
    const active = item.path === window.location.pathname
    const theme = useTheme()
    return (
        <>
            <ListItem
                onClick={() => {
                    item.children ? setOpen(!open) : history.push(item.path)
                }}
                button
                style={{
                    paddingLeft: `${depth * 20}px`,
                    color: active ? theme.palette.primary.main : 'inherit',
                }}
            >
                <item.icon />
                <ListItemText primary={item.title} />
                {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>

            {item.children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {item.children.map((x) => (
                        <SubMenuItem item={x} depth={depth + 1} />
                    ))}
                </Collapse>
            )}
        </>
    )
}

export default function Sidebar({ drawerWidth }: SidebarProps) {
    const classes = useStyles({ drawerWidth })
    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <List className={classes.listItemWrapper} disablePadding>
                {menus.map((item) => (
                    <SubMenuItem item={item} depth={0} />
                ))}
            </List>
        </Drawer>
    )
}
