import { FC, useContext } from "react"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../../database/seed-data"
import NextLink from "next/link"
import { ItemCounter } from "../ui"
import { CartContext } from "../../../context"
import { IcartProducts } from "../../../interfaces"



interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false}) => {


    const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext)


    const onNewCartQuantity = (product: IcartProducts, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

    return (
        <>
            {
                cart.map(product => (
                    <Grid container sx={{ mb: 1 }} spacing={2} key={product.slug + product.size}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            sx={{ borderRadius: '5px' }}
                                            component={'img'}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant='body1'>
                                    {product.title}
                                </Typography>
                                <Typography variant='body1'>
                                    Talla: <strong> {product.size}</strong>
                                </Typography>
                                    {editable ? 
                                    (
                                        <ItemCounter currentValue={product.quantity} maxValue={5} updatedQuantity={(value)=>{onNewCartQuantity(product, value)}}   
                                    />) 
                                    : (
                                    <Typography variant='h5'>
                                       {product.quantity} {product.quantity > 1 ? 'Items' : 'Item'}
                                    </Typography>)
                                    }

                            </Box>

                        </Grid>
                        <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Typography variant="subtitle1">
                                {`$${product.price}`}
                            </Typography>
                            {editable && (
                                <Button
                                    onClick={()=>removeCartProduct(product)}
                                    variant="text" 
                                    color='secondary'
                                >
                                    Remover
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}

