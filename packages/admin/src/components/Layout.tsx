import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

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
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            marginLeft: -drawerWidth,
            transition: marginTransition,
        },
        contentShift: {
            marginLeft: 0,
            transition: marginTransition,
        },
    }
})

const Layout: React.FC = ({ children }) => {
    const classes = useStyles()
    const { state } = useGlobalContext()
    return (
        <div className={classes.root}>
            <Header
                className={clsx({
                    [classes.appBar]: state.openDrawer,
                })}
            ></Header>
            <Sidebar
                drawerWidth={drawerWidth}
                open={state.openDrawer}
            ></Sidebar>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: state.openDrawer,
                })}
            >
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
}

export default Layout
