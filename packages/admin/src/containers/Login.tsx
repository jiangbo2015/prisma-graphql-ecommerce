import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button, Box } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import { useHistory } from 'react-router-dom'

import { useLogin } from '../graphql/User'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    wrapper: {
        maxWidth: '600px',
        marginTop: '5%',
        padding: '20px',
    },
}))

export default function InputWithIcon() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate, data, loading } = useLogin()

    const history = useHistory()

    if (data?.login) {
        localStorage.token = data.login.token
        localStorage.email = data.login.email
        history.push('/collection')
    }

    const handleLogin = () => {
        mutate({
            variables: {
                data: {
                    email,
                    password,
                },
            },
        })
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(email, password)
        handleLogin()
    }

    return (
        <Grid container justify="center">
            <Card className={classes.wrapper}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h3"
                        component="h2"
                        align="center"
                    >
                        Login
                    </Typography>
                </CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.margin}
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        helperText="required email"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className={classes.margin}
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Card>
        </Grid>
    )
}
