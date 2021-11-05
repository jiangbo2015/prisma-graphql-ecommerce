import React, { ChangeEvent, useState } from 'react'
import {
    Card,
    CardContent,
    Typography,
    InputAdornment,
    Box,
    TextField,
    Button,
} from '@mui/material'

import AccountCircle from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import { useHistory } from 'react-router-dom'

import { useLogin } from 'src/graphql/User'
import { UserLoginInput } from 'src/__generated__/globalTypes'

export default function InputWithIcon() {

    const [input, setInput] = useState<UserLoginInput>({
        password: '',
        email: '',
    })

    const handleChange = (field: keyof UserLoginInput) => (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [field]: e.target.value,
        })
    }

    const { mutate, data, loading, error } = useLogin()

    const history = useHistory()

    if (data?.login) {
        localStorage.token = data.login.token
        localStorage.email = data.login.email
        history.push('/collection')
    }

    

    const handleSubmit = () => {
        mutate({
            variables: {
                data: input,
            },
        })
    }

    return (
        <Box
            display={'flex'}
            height={'100vh'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
                backgroundImage: ({ palette }) => {
                    return `linear-gradient(${palette.primary?.main}, ${palette.secondary?.main})`
                },
            }}
        >
            <Card
                sx={{
                    maxWidth: 'sm',
                    p: 3,
                    mx: [3, 0],
                }}
            >
                <CardContent component="form" onSubmit={handleSubmit}>
                    <Typography gutterBottom variant="h4" align="center">
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        type="email"
                        value={input.email}
                        onChange={handleChange('email')}
                        required
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
                        label="Password"
                        type="password"
                        value={input.password}
                        onChange={handleChange('password')}
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
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
