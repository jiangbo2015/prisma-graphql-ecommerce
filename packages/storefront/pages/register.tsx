import React, { ChangeEvent, useState, useCallback } from 'react'
import {
    Box,
    Card,
    Typography,
    Button,
    InputAdornment,
    TextField,
    IconButton,
} from '@mui/material'
import {
    Email as EmailIcon,
    Lock,
    AccountCircle,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material'

import { useForm } from 'react-hook-form'

import { useCustomerCreate } from 'src/gql/mutation'
import { CustomerInput } from '__generated__/globalTypes'
import router from 'next/router'
import CardWrapper from 'src/components/CardWrapper'

export default function Register() {
    const { mutate, data, error } = useCustomerCreate()
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (data: CustomerInput) => {
        mutate({
            variables: {
                data,
            },
        }).catch((e) => {})
    }

    const toggleShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    if (data) {
        router.push('/login')
    }

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<CustomerInput>()

    return (
        <CardWrapper>
            <Card sx={{ p: 5, maxWidth: 'sm', textAlign: 'center' }}>
                <Typography variant="h3">Sign Up</Typography>
                <Box>
                    <TextField
                        label="Name"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {<AccountCircle />}
                                </InputAdornment>
                            ),
                        }}
                        {...register('name', {
                            required: 'name is required',
                        })}
                    />
                    <TextField
                        label="Email"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {<EmailIcon />}
                                </InputAdornment>
                            ),
                        }}
                        {...register('email', {
                            required: 'email is required',
                        })}
                    />
                    <TextField
                        label="Password"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {<Lock />}
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
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
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit(handleRegister)}
                    >
                        Submit
                    </Button>
                    {error?.message && (
                        <Typography component="h1" variant="h5" color="error">
                            {error.message}
                        </Typography>
                    )}
                    <Box mt={2}>
                        <Button href="/login">Sign In</Button>
                    </Box>
                </Box>
            </Card>
        </CardWrapper>
    )
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
