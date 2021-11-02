import Header from './Header'
import { Container } from '@mui/material'

export default ({ children }) => {
    return (
        <>
            <Header></Header>
            <Container maxWidth="lg">{children}</Container>
        </>
    )
}
