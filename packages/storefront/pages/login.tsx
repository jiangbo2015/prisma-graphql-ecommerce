import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import {
    Box,
    Card,
    Typography,
    Button,
    InputAdornment,
    TextField,
    TextFieldProps,
} from '@mui/material'

import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material'
import { useCustomerLogin } from 'src/gql/mutation'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    root: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        marginTop: '100px',
        textAlign: 'center',
    },
}))

export const CommonInput = ({
    label,
    icon,
    ...props
}: TextFieldProps & { icon: React.ReactNode }) => {
    return (
        <TextField
            label={label}
            margin="normal"
            fullWidth
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{icon}</InputAdornment>
                ),
            }}
            {...props}
        />
    )
}

export default function InputWithIcon() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { mutate, data, error } = useCustomerLogin()
    const handleLogin = () => {
        mutate({
            variables: {
                data: {
                    email,
                    password,
                },
            },
        }).catch((e) => {
            console.log(e)
        })
    }

    if (data) {
        localStorage.token = data.customerLogin.token
        localStorage.email = data.customerLogin.email
        location.assign('/')
    }

    return (
        <Card className={classes.root}>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>

            <CommonInput
                label="Email"
                icon={<EmailIcon />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CommonInput
                label="Password"
                icon={<LockIcon />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Box sx={{ mt: 3, width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                >
                    Submit
                </Button>
            </Box>
            {error?.message && (
                <Typography component="h1" variant="h5" color="error">
                    {error.message}
                </Typography>
            )}

            <Box mt="20px">
                <Button href="/register">Sign Up</Button>
            </Box>
        </Card>
    )
}
