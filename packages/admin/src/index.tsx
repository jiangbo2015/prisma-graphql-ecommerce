import React from 'react'
import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom'
import { CssBaseline, adaptV4Theme } from '@mui/material'
import {
    createTheme,
    ThemeProvider,
    Theme,
    StyledEngineProvider,
} from '@mui/material/styles'

import App from './App'
import StoreProvider from './context'
import client from './client'

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

const theme = createTheme()
console.log(theme, 'theme')

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
