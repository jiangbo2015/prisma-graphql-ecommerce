import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
    IconButton,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AddShoppingCart } from '@mui/icons-material'

const useStyles = makeStyles({
    root: {},
    media: {
        paddingTop: '100%',
    },
    actions: {
        justifyContent: 'space-between',
    },
})

export default ({ item }) => {
    const classes = useStyles()
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card elevation={3}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={item.image}
                    ></CardMedia>
                    <CardContent>
                        <Typography>{item.title}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing className={classes.actions}>
                    <Typography color="primary">${item.price}</Typography>
                    <IconButton size="large">
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}
