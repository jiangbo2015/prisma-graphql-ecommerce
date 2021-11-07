import Header from './Header'
import { Container } from '@mui/material'

export default function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <Container maxWidth="lg" sx={{ pt: 5 }}>
                {children}
            </Container>
        </>
    )
}
