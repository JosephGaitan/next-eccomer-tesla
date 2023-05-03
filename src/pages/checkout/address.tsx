import { ShopLayout } from "@/components/layout"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

const AddressPage = () => {
    return (
        <ShopLayout title={"Dirección"} pageDescription={"Confirmar dirección del destino"}>
            <Typography variant='h1' component={'h1'}>
                Información de envío
            </Typography>
            <Grid container mt={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Nombre' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Apellido' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Dirección' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Dirección 2' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Ciudad' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Codigo Postal' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select variant='filled' label='País' value={1}>
                            <MenuItem value={1}>
                                España
                            </MenuItem>
                            <MenuItem value={2}>
                                Portugal
                            </MenuItem>
                            <MenuItem value={3}>
                                Andorra
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField variant="filled" fullWidth label='Teléfono' />
                </Grid>
                
            </Grid>
            <Box sx={{mt:5}} display={'flex'} justifyContent={'center'}>
                    <Button color='secondary' className="circular-btn" size="large">
                        Revisar pedido
                    </Button>
                </Box>
        </ShopLayout>
    )
}

export default AddressPage
