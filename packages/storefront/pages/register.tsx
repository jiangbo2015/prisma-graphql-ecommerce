import React, { ChangeEvent, useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
import { Box, Card, Paper, Typography, Button } from '@mui/material'
import { omit } from 'lodash'

import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { CommonInput } from './login'
import { useCustomerCreate } from 'src/gql/mutation'
import { CustomerInput } from '__generated__/globalTypes'

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
export default function InputWithIcon() {
    const classes = useStyles()
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
        location.assign('/login')
    }

    return (
        <Card className={classes.root}>
            <Box display="flex" justifyContent="center" mb="20px">
                <Typography variant="h3">Sign Up</Typography>
            </Box>
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
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                {error?.message && (
                    <Typography component="h1" variant="h5" color="error">
                        {error.message}
                    </Typography>
                )}
                <Box mt="20px">
                    <Button href="/login">Sign In</Button>
                </Box>
            </Box>
        </Card>
    )
}
