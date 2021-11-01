import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {},
    media: {
        paddingTop: '50%',
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
                        image={
                            'https://dev-to-uploads.s3.amazonaws.com/i/oxuuoibjpl1pb0ukgxjj.png'
                        }
                    ></CardMedia>
                    <CardContent>
                        <Typography>{item.title}</Typography>
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
