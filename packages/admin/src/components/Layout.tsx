import React from 'react'
import clsx from 'clsx'
import makeStyles from '@mui/styles/makeStyles'
import { Toolbar, Box } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import { useGlobalContext } from 'src/context'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    const marginTransition = theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    })
    return {
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            marginLeft: '0',
            transition: marginTransition,
        },
        contentShift: {
            marginLeft: '240px',
            transition: marginTransition,
        },
    }
})

const Layout: React.FC = ({ children }) => {
    const classes = useStyles()
    const { state } = useGlobalContext()
    const { openDrawer } = state
    return (
        <Box sx={{ flex: 1 }}>
            <Header drawerWidth={openDrawer ? drawerWidth : 0} />
            <Sidebar drawerWidth={drawerWidth} open={state.openDrawer} />

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: state.openDrawer,
                })}
            >
                <Toolbar />
                {children}
            </main>
        </Box>
    )
}

export default Layout
