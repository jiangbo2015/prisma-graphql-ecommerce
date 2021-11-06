import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    Typography,
    Button,
    InputAdornment,
    TextField,
    TextFieldProps,
    Container,
} from '@mui/material'

import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material'
import { useCustomerLogin } from 'src/gql/mutation'
import CardWrapper from 'src/components/CardWrapper'

export const CommonInput = ({
    icon,
    ...props
}: TextFieldProps & { icon: React.ReactNode }) => {
    return (
        <TextField
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
        })
    }

    useEffect(() => {
        if (data) {
            localStorage.token = data.customerLogin.token
            localStorage.email = data.customerLogin.email
            location.assign('/')
        }
    }, [data])

    return (
        <CardWrapper>
            <Card sx={{ p: 5, maxWidth: 'sm', textAlign: 'center' }}>
                <Typography variant="h3">Sign In</Typography>

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

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={handleLogin}
                >
                    Submit
                </Button>

                {error?.message && (
                    <Typography component="h1" variant="h5" color="error">
                        {error.message}
                    </Typography>
                )}

                <Box mt={2} textAlign={'center'}>
                    <Button href="/register">Sign Up</Button>
                </Box>
            </Card>
        </CardWrapper>
    )
}
