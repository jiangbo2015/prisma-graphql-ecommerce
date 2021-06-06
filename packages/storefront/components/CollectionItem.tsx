import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {},
    media: {
        paddingTop: '60%',
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
                        image="https://material-ui.com/static/images/cards/paella.jpg"
                    ></CardMedia>
                    <CardContent>
                        <Typography>{item.name}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing className={classes.actions}>
                    <Typography color="primary">
                        count: {item.productCount}
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    )
}
