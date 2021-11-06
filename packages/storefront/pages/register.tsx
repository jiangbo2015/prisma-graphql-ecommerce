import React, { ChangeEvent, useState } from 'react'
import { Box, Card, Typography, Button } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { CommonInput } from './login'
import { useCustomerCreate } from 'src/gql/mutation'
import { CustomerInput } from '__generated__/globalTypes'
import router from 'next/router'
import CardWrapper from 'src/components/CardWrapper'

export default function Register() {
    const { mutate, data, error } = useCustomerCreate()
    const [input, setInput] = useState<CustomerInput>({
        email: '',
        password: '',
        name: '',
    })
    const handleSubmit = () => {
        mutate({
            variables: {
                data: input,
            },
        }).catch((e) => {})
    }

    const handleChange =
        (field: keyof CustomerInput) => (e: ChangeEvent<HTMLInputElement>) => {
            setInput({
                ...input,
                [field]: e.target.value,
            })
        }

    if (data) {
        router.push('/login')
    }

    return (
        <CardWrapper>
            <Card sx={{ p: 5, maxWidth: 'sm', textAlign: 'center' }}>
                <Typography variant="h3">Sign Up</Typography>
                <Box>
                    <CommonInput
                        label="Name"
                        name="name"
                        icon={<AccountCircle />}
                        required
                        value={input.name}
                        onChange={handleChange('name')}
                    />
                    <CommonInput
                        label="Email"
                        name="email"
                        type={'email'}
                        icon={<EmailIcon />}
                        required
                        value={input.email}
                        onChange={handleChange('email')}
                    />
                    <CommonInput
                        label="Password"
                        name="password"
                        required
                        icon={<LockIcon />}
                        value={input.password}
                        onChange={handleChange('password')}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
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
