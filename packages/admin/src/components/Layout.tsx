import React from 'react'

import { Toolbar, Box } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import { useGlobalContext } from 'src/context'

const drawerWidth = 240

const Layout: React.FC = ({ children }) => {
    const { state } = useGlobalContext()
    const { openDrawer } = state
    return (
        <Box sx={{ flex: 1 }}>
            <Header drawerWidth={openDrawer ? drawerWidth : 0} />
            <Sidebar drawerWidth={drawerWidth} open={state.openDrawer} />

            <Box ml={openDrawer ? `${drawerWidth}px` : '0'} p={5}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default Layout
