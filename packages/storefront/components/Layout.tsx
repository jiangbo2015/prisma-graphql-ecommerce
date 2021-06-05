import Header from './Header'
import { Container } from '@material-ui/core'

export default ({ children }) => {
    return (
        <>
            <Header></Header>
            <Container maxWidth="md">{children}</Container>
        </>
    )
}
