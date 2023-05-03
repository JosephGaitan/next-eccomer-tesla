import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { initialData } from '../../../database/products'
import { ItemCounter } from '@/components/ui'
import { ProductSlideShow } from '@/components/products/ProductSlideShow'
import { ShopLayout } from '@/components/layout'
import React from 'react'
import { SizeSelector } from '@/components/products'

const product = initialData.products[1]

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow
            images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {`$${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>
                Cantidad
              </Typography>
              <ItemCounter />
              <SizeSelector selectedSize={product.sizes[2]} sizes={product.sizes} />
            </Box>
            <Button color='secondary' className='circular-btn'>
              Agregar al Carrito
            </Button>
            {/*<Chip label='No hay disponibles' color='error' variant='outlined'/>*/}

            <Box
              sx={{ mt: 3 }}
            >
              <Typography variant='subtitle2'>
                Descripción
              </Typography>
              <Typography variant='body2'>
                {product.description}
              </Typography>
            </Box>

          </Box>

        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export default ProductPage
