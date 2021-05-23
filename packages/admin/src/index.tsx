import React from 'react'
import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import App from './App'
import StoreProvider from './context'
import client from './client'

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                ul: {
                    paddingInlineStart: 0,
                },
                a: {
                    color: 'inherit',
                },
            },
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <App />
                    <CssBaseline></CssBaseline>
                </ThemeProvider>
            </ApolloProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
