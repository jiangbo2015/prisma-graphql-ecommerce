import Header from './Header'
import { Container } from '@mui/material'

export default function App({ children }) {
    return (
        <>
            <Header></Header>
            <Container maxWidth="lg">{children}</Container>
        </>
    )
}
