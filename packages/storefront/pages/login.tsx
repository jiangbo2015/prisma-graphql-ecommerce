import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, Paper, Typography, Button } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
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
        <Box mb="20px">
            <TextField
                label={label}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">{icon}</InputAdornment>
                    ),
                }}
                {...props}
            />
        </Box>
    )
}

export default function InputWithIcon() {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <Box display="flex" justifyContent="center" mb="20px">
                <Typography variant="h3">Login</Typography>
            </Box>
            <Box>
                <CommonInput label="Email" icon={<EmailIcon />} />
                <CommonInput label="Password" icon={<LockIcon />} />

                <Button variant="contained" color="primary">
                    Login
                </Button>
                <Box mt="20px">
                    <Button href="/register">Register</Button>
                </Box>
            </Box>
        </Card>
    )
}
