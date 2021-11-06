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
import { AddShoppingCart } from '@mui/icons-material'

export default ({ item }) => {
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card elevation={3}>
                <CardActionArea>
                    <CardMedia
                        sx={{ pt: '100%' }}
                        image={item.image}
                    ></CardMedia>
                    <CardContent>
                        <Typography>{item.title}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    <Typography color="primary">${item.price}</Typography>
                    <IconButton size="large">
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}
