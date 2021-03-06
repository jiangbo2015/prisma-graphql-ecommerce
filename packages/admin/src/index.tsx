import React from 'react'
import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@mui/material'
import {
    createTheme,
    ThemeProvider,
    StyledEngineProvider,
} from '@mui/material/styles'

import App from './App'
import StoreProvider from './context'
import client from './client'

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string
        }
    }
    interface ThemeOptions {
        status?: {
            danger?: string
        }
    }
    interface Palette {
        myCustomColor?: Palette['primary']
    }
    interface PaletteOptions {
        myCustomColor?: PaletteOptions['primary']
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#fc466b',
        },
        secondary: {
            main: '#3f5efb',
        },

        myCustomColor: {
            main: 'red',
        },
    },
    status: {
        danger: 'red',
    },
})

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <ApolloProvider client={client}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <App />
                        <CssBaseline></CssBaseline>
                    </ThemeProvider>
                </StyledEngineProvider>
            </ApolloProvider>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
