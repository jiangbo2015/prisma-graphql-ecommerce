import React, { ReactEventHandler, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Box,
    MenuItem,
    Typography,
    Badge,
    Menu,
    IconButton,
    ClickAwayListener,
} from '@mui/material'

import { ShoppingCart, AccountCircle } from '@mui/icons-material'
import Dropdown from './Dropdown'

import Link from 'next/link'
import { useState } from 'react'

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = useState()
    const [email, setEmail] = useState()
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClickAway = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        const { email } = localStorage
        setEmail(email)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        location.assign('/login')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={'a'}
                    color={'white'}
                    href="/"
                >
                    PGE
                </Typography>
                <Box
                    display="flex"
                    flexGrow={1}
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <MenuItem component={'a'} href="/products">
                        Products
                    </MenuItem>
                    <MenuItem component={'a'} href="/collections">
                        Collections
                    </MenuItem>
                    <MenuItem>
                        <IconButton color="inherit" size="large">
                            <Badge badgeContent={17} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </MenuItem>
                    <Dropdown
                        trigger={
                            <IconButton color="inherit" size="large">
                                <AccountCircle />
                            </IconButton>
                        }
                    >
                        {email ? (
                            <>
                                <MenuItem>{email}</MenuItem>,
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem component={'a'} href="/login">
                                    Sign in
                                </MenuItem>
                                ,
                                <MenuItem component={'a'} href="/register">
                                    Sign up
                                </MenuItem>
                            </>
                        )}
                    </Dropdown>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
