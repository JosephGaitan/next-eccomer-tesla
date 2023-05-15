import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layout"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../../context"

const CartPage = () => {

    const {numberOfItems} = useContext(CartContext)

    return (
        <ShopLayout title={`Cart - ${numberOfItems > 9 ? '+9' :  numberOfItems} ${numberOfItems > 1 || numberOfItems === 0 ? 'items' : 'item'}`} pageDescription={"Carrito de compras de la tienda"}>
            <Typography variant="h1" component={'h1'}>
                <Grid container>
                    <Grid item xs={12} sm={7}>
                        <CartList editable/>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>
                                    Orden
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <OrderSummary/>
                                <Box sx={{ mt: 3 }}>
                                    <Button color='secondary' className="circular-btn" fullWidth>
                                        Checkout
                                    </Button>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Typography>
        </ShopLayout>
    )
}

export default CartPage
