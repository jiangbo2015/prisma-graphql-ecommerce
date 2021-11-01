import { ApolloProvider } from '@apollo/client'
import client from 'client'

import 'styles/globals.css'

import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme(adaptV4Theme({}))

export default function MyApp(props) {
    const { Component, pageProps } = props

    // React.useEffect(() => {
    //     // Remove the server-side injected CSS.
    //     const jssStyles = document.querySelector('#jss-server-side')
    //     if (jssStyles) {
    //         jssStyles.parentElement.removeChild(jssStyles)
    //     }
    // }, [])

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ApolloProvider client={client}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </StyledEngineProvider>
            </ApolloProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}
