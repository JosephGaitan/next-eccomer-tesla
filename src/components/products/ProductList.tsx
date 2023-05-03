import React, { FC } from 'react'
import { Iproducts } from '../../../interfaces'
import { Grid } from '@mui/material'
import { ProductCard } from './ProductCard'

interface Props {
    products: Iproducts[]
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <Grid container spacing={4}>
            {
                products.map(product => (
                    <ProductCard
                        key={product.slug}
                        product={product}
                    />
                ))
            }
        </Grid>
    )
}



