import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    Typography,
    Button,
    InputAdornment,
    TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material'

import { useCustomerLogin } from 'src/gql/mutation'
import CardWrapper from 'src/components/CardWrapper'
import { CustomerLoginInput } from '__generated__/globalTypes'

export default function InputWithIcon() {
    const { mutate, data, error } = useCustomerLogin()
    const {
        handleSubmit,
        register,
        formState: { errors },
        ...other
    } = useForm<CustomerLoginInput>()

    const handleLogin = (data: CustomerLoginInput) => {
        mutate({
            variables: {
                data,
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

                <TextField
                    label="Email"
                    margin="normal"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {<EmailIcon />}
                            </InputAdornment>
                        ),
                    }}
                    {...register('email', { required: 'email is required' })}
                />
                <TextField
                    label="password"
                    margin="normal"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {<LockIcon />}
                            </InputAdornment>
                        ),
                    }}
                    {...register('password', {
                        required: 'password is required',
                    })}
                />

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={handleSubmit(handleLogin)}
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
