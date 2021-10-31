import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
} from '@mui/material'
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from 'src/context'

type DrawerWidth = {
    drawerWidth: number
}

export default function MenuAppBar({ drawerWidth }: DrawerWidth) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const history = useHistory()
    const { dispatch } = useGlobalContext()

    const handleToggle = () => {
        dispatch({
            type: 'toggleDarwer',
        })
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget as HTMLElement)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        localStorage.token = null
        history.push('/login')
    }

    return (
        <AppBar
            position="absolute"
            sx={{
                flexGrow: 1,
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleToggle}
                    size="large"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" flexGrow={1}>
                    {localStorage.email}
                </Typography>
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        size="large"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
