import React, { FC, useMemo, useState } from 'react'
import { Iproducts } from '../../../interfaces'
import NextLink from 'next/link';
import { Box, Button, Card, CardActionArea, CardMedia, Chip, Grid, Icon, Link, Typography } from '@mui/material'
import Image from 'next/image';

interface Props {
    product: Iproducts;
}

export const ProductCard: FC<Props> = ({ product }) => {


    const [isHovered, setIsHovered] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const ProductImage = useMemo(() => {
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`
    }, [isHovered, product.images])

    return (
        <Grid

            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card

                sx={{
                    transition: 'box-shadow .3s ease-in-out',
                    '&:hover': {
                        boxShadow: '2px 9px 14px rgba(38, 38, 41, .4)'
                    },
                    boxShadow: '0px 4px 8px rgba(38, 38, 41, .2)', padding: '1rem 3rem 2rem 3rem',
                    background: '#F9F9F9',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Image
                    src={'/products/teslaIcon2.png'}
                    alt={'Tesla Img'} height={30}
                    width={30} />
                <Box>

                    <NextLink
                        legacyBehavior
                        href={`/product/${product.slug}`}
                        passHref
                        prefetch={false}>
                        <Link>
                            <CardActionArea >
                                {
                                    product.inStock === 0 && (
                                        <Chip
                                            color='primary'
                                            label='Sold Out'
                                            sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                                        />
                                    )
                                }
                                <CardMedia

                                    className='fadeIn'
                                    component='img'
                                    image={ProductImage}
                                    alt={product.title}
                                    onLoad={() => setIsImageLoaded(true)}
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Box>
                <Box
                    className='fadeIn'
                    sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
                >
                    <Box
                        sx={{ height: { lg: '5.5rem', md: '7rem', sm: '6.2rem', xs: '8rem' } }}
                    >
                        <Typography
                            sx={{ fontSize: { lg: '1.2rem', md: '0.8rem', sm: '1rem' } }}
                            textTransform={'uppercase'}
                            fontWeight={700}>
                            {product.title}
                        </Typography>
                        <Typography
                            sx={{ mt: '5px', fontSize: { lg: '1rem', md: '1rem', sm: '0.8rem' } }}
                            component='p'
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>
                    </Box>
                    <Box
                        sx={{ mt: 3, alignItems: 'center', justifyContent: 'end', display: 'flex' }}
                    >
                        <Typography
                            sx={{ fontSize: { lg: '1.5rem', md: '1.3rem', sm: '1rem', xs: '1.5rem' } }}
                            fontWeight={300}
                            color={'secondary'}
                        >
                            {`$${product.price}`}
                        </Typography>
                    </Box>
                    <Box
                        sx={{ mt: 3, alignItems: 'center', justifyContent: 'center', display: 'flex' }}
                    >
                        {
                            product.inStock > 0 ? (
                                <Button
                                    color='secondary'
                                    className="circular-btn"
                                    sx={{ width: '17rem', height: '2.5rem', fontSize: '1rem', }}
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <Chip label='Sold Out' color='error' variant='outlined' sx={{ width: '17rem', height: '2.5rem', fontSize: '1rem', }} />
                            )
                        }

                    </Box>
                </Box>

            </Card>
        </Grid>
    )
}



