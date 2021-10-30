import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, Typography, Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'

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

export const CommonInput = ({ label, icon, ...props }) => {
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

    return (
        <Card className={classes.root}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <CommonInput label="Email" icon={<EmailIcon />} />
            <CommonInput label="Password" icon={<LockIcon />} />

            <Box sx={{ mt: 3, width: '100%' }}>
                <Button variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </Box>
            <Box mt="20px">
                <Button href="/register">Register</Button>
            </Box>
        </Card>
    )
}
