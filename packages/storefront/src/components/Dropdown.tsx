import { ClickAwayListener, Menu, MenuItem, MenuProps } from '@mui/material'
import { useState } from 'react'

type DropDownProps = {
    trigger: React.ReactNode
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    menuProps?: MenuProps
}

export default function ({
    trigger,
    children,
    onClick,
    menuProps,
}: DropDownProps) {
    const [anchorEl, setAnchorEl] = useState()

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget)
        onClick && onClick(e)
    }
    const handleClickAway = () => {
        setAnchorEl(null)
    }
    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <MenuItem onClick={handleOpen}>{trigger}</MenuItem>
            </ClickAwayListener>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                {...menuProps}
            >
                {children}
            </Menu>
        </>
    )
}
