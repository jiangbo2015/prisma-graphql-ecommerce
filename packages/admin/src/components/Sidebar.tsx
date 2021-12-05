import {
    Collapse,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Drawer,
    Divider,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { menus, IMenu } from 'src/route'

type SidebarProps = {
    drawerWidth: number
}

type SubMenuItemProps = {
    item: IMenu
    depth: number
}

const useStyles = makeStyles<Theme, SidebarProps>((theme) => ({
    drawerPaper: (props) => ({
        width: `${props.drawerWidth}px`,
    }),

    listItemActive: {
        color: `${theme.palette.primary.main}`,
    },
}))

const SubMenuItem = ({ item, depth }: SubMenuItemProps) => {
    const [open, setOpen] = useState(
        window.location.pathname.includes(item.path)
    )
    const history = useHistory()
    const active = item.path === window.location.pathname

    return (
        <>
            <ListItem
                onClick={() => {
                    item.children ? setOpen(!open) : history.push(item.path)
                }}
                button
                sx={{
                    bgcolor: active ? 'primary.main' : 'inherit',
                    pl: `${depth * 10 + 10}px`,
                    color: active ? 'text.primary' : 'inherit',
                }}
            >
                <item.icon />
                <ListItemText sx={{ ml: 3 }} primary={item.title} />
                {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            <Divider />

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

export default function Sidebar({
    drawerWidth,
    open,
}: SidebarProps & { open: boolean }) {
    const classes = useStyles({ drawerWidth })
    return (
        <Drawer
            variant="persistent"
            sx={{
                width: drawerWidth,
            }}
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            open={open}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: [1],
                }}
            >
                PGFE
            </Toolbar>
            <Divider />
            <List disablePadding>
                {menus.map((item) => (
                    <SubMenuItem item={item} depth={0} />
                ))}
            </List>
        </Drawer>
    )
}
