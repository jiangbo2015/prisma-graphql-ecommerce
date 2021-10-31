import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, Paper, Typography, Button } from '@material-ui/core'
import Link from 'next/link'
import { omit } from 'lodash'

import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import AccountCircle from '@material-ui/icons/AccountCircle'
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
