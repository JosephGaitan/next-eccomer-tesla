import { Divider, Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../../context"
import { currency } from "../../../utilities"


export const OrderSummary = () => {

    const {total, subTotal, numberOfItems, tax, } = useContext(CartContext)
    
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>
                    No. Productos
                </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>
                    {numberOfItems} {numberOfItems > 1 ? 'Items' : 'Item'}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    Subtotal
                </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>
                    {currency.format(subTotal)}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
                </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>
                    {currency.format(tax)}
                </Typography>
            </Grid>
            <Divider sx={{mt:5}}/>
            <Grid item xs={6} >
                <Typography variant="subtitle1">
                    Total:
                </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography variant="subtitle1" >
                    {currency.format(total)}
                </Typography>
            </Grid>
        </Grid>
    )
}


