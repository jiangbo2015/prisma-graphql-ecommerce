import React, { ReactEventHandler, useRef } from 'react'
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
} from '@material-ui/core'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import { useState } from 'react'

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = useState()
    const [opne, setOpne] = useState(false)
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClickAway = () => {
        setAnchorEl(null)
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Sharp Graphql Ecommerce</Typography>
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
                        <IconButton color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </MenuItem>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <MenuItem onClick={handleOpen}>
                            <IconButton color="inherit">
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
                    onClose={() => setOpne(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem component={'a'} href="/login">
                        Sign in
                    </MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
