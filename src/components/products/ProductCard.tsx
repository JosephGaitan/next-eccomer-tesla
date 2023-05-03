import React, { FC, useMemo, useState } from 'react'
import { Iproducts } from '../../../interfaces'
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'

interface Props {
    product: Iproducts;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false)

    const ProductImage = useMemo(() => {
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`
    }, [isHovered, product.images])

    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink 
                    legacyBehavior 
                    href={"/product/slug"} 
                    passHref 
                    prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                className='fadeIn'
                                component='img'
                                image={ProductImage}
                                alt={product.title}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={{ mt: 1 }} className='fadeIn'>
                <Typography fontWeight={700}>
                    {product.title}
                </Typography>
                <Typography fontWeight={500}>
                    {`$${product.price}`}
                </Typography>
            </Box>
        </Grid>
    )
}



