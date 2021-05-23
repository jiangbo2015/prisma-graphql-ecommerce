import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    wrapper: {
        maxWidth: '600px',
        marginTop: '5%',
        padding: '20px',
    },
}))

export default function InputWithIcon() {
    const classes = useStyles()

    return (
        <Grid container justify="center">
            <Card className={classes.wrapper}>
                <CardContent>
                    <Typography gutterBottom variant="h3" component="h2" align="center">
                        Login
                    </Typography>
                </CardContent>
                <TextField
                    className={classes.margin}
                    label="Email"
                    type="email"
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
                    className={classes.margin}
                    label="Password"
                    type="password"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <CardActions>
                    <Grid container justify="center">
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    )
}
