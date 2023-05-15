import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '../../../context'

import { NextPage, GetStaticPaths, GetStaticProps } from 'next'

import { ISize, IcartProducts, Iproducts } from '../../../interfaces'

import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { dbProducts } from '../../../database'
import { ItemCounter } from '@/components/ui'
import { ProductSlideShow } from '@/components/products/ProductSlideShow'
import { ShopLayout } from '@/components/layout'
import { SizeSelector } from '@/components/products'


interface Props {
  product: Iproducts
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter()
  const {addProductToCart} = useContext(CartContext)

  const selectedSize = (size:ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct, size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct, quantity
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) { return}
    addProductToCart(tempCartProduct);
    router.push('/cart')
  }

  const [tempCartProduct, setTempCartProduct] = useState<IcartProducts>({
    _id: product._id,
  image: product.images[0],
  price: product.price,
  size: undefined,
  slug: product.slug,
  title: product.title,
  gender: product.gender,
  quantity: 1
  })

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />
              <SizeSelector 
                selectedSize={tempCartProduct.size} 
                sizes={product.sizes} 
                onSelectedSize={(size)=>selectedSize(size)}
              />
            </Box>

            {
              product.inStock > 0 ? (
                <Button 
                  color='secondary' 
                  className='circular-btn'
                  onClick={() => onAddProduct()}
                >
                  {
                    tempCartProduct.size 
                    ? 'Agregar al Carrito'
                    : 'Seleccione una talla'
                  }
                </Button>
              ) : (
                <Chip label='Sold Out' color='error' variant='outlined' />
              )
            }


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

export const getStaticPaths: GetStaticPaths = async () => {

  const productSlugs = await dbProducts.getAllProductSlug();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

//SSR no usar

/**export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)
  
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
} */


export default ProductPage
