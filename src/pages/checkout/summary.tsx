import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layout"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link"

const SummaryPage = () => {
    return (
        <ShopLayout title={"Resumen de orden"} pageDescription={"Revisa y confirma la orden"}>
            <Typography variant="h1" component={'h1'}>Resumen de la orden</Typography>
            <Grid container mt={2}>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>
                                Resumen (3 Productos)
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent={'end'} >
                                <NextLink passHref legacyBehavior href={"/checkout/address"}>
                                    <Link underline='always'>Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>
                                Dirección de entrega
                            </Typography>
                            <Typography>
                                Joseph Z. Gaitán
                            </Typography>
                            <Typography>
                                Calle Gran Madrid 26
                            </Typography>
                            <Typography>
                                Madrid, 28001
                            </Typography>
                            <Typography>
                                España
                            </Typography>
                            <Typography>
                                +34 603 133456
                            </Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' sx={{ mb: 2 }} justifyContent={'end'} >
                                <NextLink passHref legacyBehavior href={"/cart"}>
                                    <Link underline='always'>Editar</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className="circular-btn" fullWidth>
                                    Confirmar Orden
                                </Button>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage
