import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'
import Sidebar from './Sidebar'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
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
    },
}))

const Layout: React.FC = ({ children }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Header className={classes.appBar}></Header>
            <Sidebar drawerWidth={drawerWidth}></Sidebar>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
}

export default Layout
