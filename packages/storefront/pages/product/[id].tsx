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
import { initializeApollo } from 'src/client'
import { PRODUCT_BY_ID, PRODUCT_LIST } from 'src/gql/query'
import {
    ProductById,
    ProductByIdVariables,
    ProductById_productById,
} from '__generated__/ProductById'
import { GetStaticPropsContext } from 'next'
import { ProductList } from '__generated__/ProductList'

const fallbackImage =
    'https://dev-to-uploads.s3.amazonaws.com/i/oxuuoibjpl1pb0ukgxjj.png'

export default function Detail({ data }: { data: ProductById_productById }) {
    return (
        <Layout>
            <Container sx={{ pt: 4 }}>
                <Grid container spacing={5} width={'100%'}>
                    <Grid item md={6}>
                        <Card>
                            <CardMedia
                                sx={{ pt: '100%' }}
                                image={data.image || fallbackImage}
                            ></CardMedia>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Stack spacing={3}>
                            <Typography variant="h4">{data.title}</Typography>
                            <Box>
                                <Rating value={4} />
                            </Box>
                            <Typography variant="h5">
                                Price: ${data.price}
                            </Typography>
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant="h6">Color: </Typography>
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
    const apolloClient = initializeApollo()
    try {
        const { data } = await apolloClient.query<ProductList>({
            query: PRODUCT_LIST,
        })
        return {
            paths: data.productList.map((x) => ({
                params: { id: String(x.id) },
            })),
            fallback: false,
        }
    } catch (e) {
        return {
            paths: [],
        }
    }
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<{ id: string }>) {
    const apolloClient = initializeApollo()
    try {
        const { data } = await apolloClient.query<
            ProductById,
            ProductByIdVariables
        >({
            query: PRODUCT_BY_ID,
            variables: {
                id: parseInt(params.id),
            },
        })
        return {
            props: {
                data: data.productById,
            },
        }
    } catch (e) {
        return {
            props: {
                data: {},
            },
        }
    }
}
