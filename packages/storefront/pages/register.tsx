import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, Paper, Typography, Button } from '@material-ui/core'
import Link from 'next/link'

import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import { CommonInput } from './login'

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

    return (
        <Card className={classes.root}>
            <Box display="flex" justifyContent="center" mb="20px">
                <Typography variant="h3">Register</Typography>
            </Box>
            <Box>
                <CommonInput label="Email" icon={<EmailIcon />} />
                <CommonInput label="Password" icon={<LockIcon />} />
                <CommonInput label="Confirm Passwrod" icon={<LockIcon />} />
                <Button variant="contained" color="primary">
                    Register
                </Button>
                <Box mt="20px">
                    <Button href="/login">Login</Button>
                </Box>
            </Box>
        </Card>
    )
}
