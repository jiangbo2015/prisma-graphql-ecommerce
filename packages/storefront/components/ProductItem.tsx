import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
    IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'

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
                    <IconButton>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}
