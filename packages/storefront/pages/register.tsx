import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { Box, Card, Paper, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { omit } from 'lodash'

import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { CommonInput } from './login'
import { useCustomerCreate } from 'gql/mutation'

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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const data = Object.fromEntries(fd)
        mutate({
            variables: {
                data: omit(data, 'confirmPwd'),
            },
        }).catch((e) => {})
    }
    if (data) {
        location.assign('/login')
    }
    return (
        <Card className={classes.root}>
            <Box display="flex" justifyContent="center" mb="20px">
                <Typography variant="h3">Sign Up</Typography>
            </Box>
            <Box component={'form'} onSubmit={handleSubmit}>
                <CommonInput
                    label="Name"
                    name="name"
                    icon={<AccountCircle />}
                    required
                />
                <CommonInput
                    label="Email"
                    name="email"
                    type={'email'}
                    icon={<EmailIcon />}
                    required
                />
                <CommonInput
                    label="Password"
                    name="password"
                    required
                    icon={<LockIcon />}
                />
                <CommonInput
                    label="Confirm Passwrod"
                    name="confirmPwd"
                    icon={<LockIcon />}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
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
