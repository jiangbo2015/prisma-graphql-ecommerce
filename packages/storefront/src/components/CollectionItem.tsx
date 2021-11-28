import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    CardActions,
} from '@mui/material'

export default function CollectionItem({ item }) {
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card elevation={3}>
                <CardActionArea>
                    <CardMedia
                        sx={{ pt: '100%' }}
                        image={
                            'https://dev-to-uploads.s3.amazonaws.com/i/oxuuoibjpl1pb0ukgxjj.png'
                        }
                    ></CardMedia>
                    <CardContent>
                        <Typography>{item.title}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    <Typography color="primary">
                        count: {item.productCount}
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
    )
}
