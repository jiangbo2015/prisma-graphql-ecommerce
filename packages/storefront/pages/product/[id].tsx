import Layout from 'src/components/Layout'
import {
    Box,
    Grid,
    CardMedia,
    Card,
    Container,
    Typography,
    Button,
    Rating,
    Stack,
    Radio,
    FormControl,
    FormControlLabel,
    RadioGroup,
} from '@mui/material'
import { CircleRounded, CheckCircleRounded } from '@mui/icons-material'

export default function Detail({ params }) {
    return (
        <Layout>
            <Container sx={{ pt: 4 }}>
                <Grid container spacing={5} width={'100%'}>
                    <Grid item md={6}>
                        <Card>
                            <CardMedia
                                sx={{ pt: '100%' }}
                                image="https://dev-to-uploads.s3.amazonaws.com/i/oxuuoibjpl1pb0ukgxjj.png"
                            ></CardMedia>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Stack spacing={3}>
                            <Typography variant="h3">product title</Typography>
                            <Box>
                                <Rating value={4} />
                            </Box>
                            <Typography variant="h5">$200</Typography>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant="h6">Color</Typography>
                                <RadioGroup row sx={{ ml: 2 }}>
                                    {['red', 'green', 'yellow'].map((x) => (
                                        <FormControlLabel
                                            label=""
                                            key={x}
                                            control={
                                                <Radio
                                                    value={x}
                                                    sx={{
                                                        color: x,
                                                        '&.Mui-checked': {
                                                            color: x,
                                                        },
                                                        width: '30px',
                                                        height: '30px',
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: '1.8rem',
                                                        },
                                                    }}
                                                    icon={<CircleRounded />}
                                                    checkedIcon={
                                                        <CheckCircleRounded />
                                                    }
                                                />
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </Box>
                            <Stack direction={'row'} spacing={2}>
                                <Button variant="contained" fullWidth>
                                    Add to cart
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    Buy now
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export async function getStaticPaths() {
    // mock serve data
    const paths = [
        {
            params: { id: '1' },
        },
        {
            params: { id: '2' },
        },
    ]
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    console.log(params, 'params')
    return {
        props: {
            params,
        },
    }
}
