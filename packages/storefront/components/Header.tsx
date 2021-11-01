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

import {ShoppingCart, AccountCircle} from '@mui/icons-material'

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
                <Typography variant="h6">PGE</Typography>
                <Box
                    flexGrow="1"
                    display="flex"
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
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <MenuItem onClick={handleOpen}>
                            <IconButton color="inherit" size="large">
                                <AccountCircle />
                            </IconButton>
                        </MenuItem>
                    </ClickAwayListener>
                </Box>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {email ? (
                        <>
                            <MenuItem>{email}</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem component={'a'} href="/login">
                                Sign in
                            </MenuItem>
                            <MenuItem component={'a'} href="/register">
                                Sign up
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
