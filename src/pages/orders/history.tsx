import { Button, Chip, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '@/components/layout'
import NextLink from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, },
    {
        field: 'paid',
        headerName: 'Estado del pago',
        description: 'Muestra información si la orden está pagada o no',
        width: 200,
        sortable: false,
        renderCell: (params: GridCellParams) => {
            return (
                params.row.paid ? (<Chip
                    sx={{ my: 2 }}
                    label='Pago Recibido'
                    variant="outlined"
                    color='success'
                    icon={<CreditScoreOutlined />}
                />)
                    : (<Chip
                        sx={{ my: 2 }}
                        label='Pago pendiente'
                        variant="outlined"
                        color='error'
                        icon={<CreditCardOffOutlined />}
                    />)
            )
        }
    },
    { field: 'fullName', headerName: 'Nombre Completo', width: 200, },
    {
        field: 'orden',
        headerName: 'Detalles de la orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridCellParams) => (
        <NextLink  passHref legacyBehavior href={`/orders/${params.row.id}`} >
            <Link underline='always'>
                Detalles
            </Link>
        </NextLink>
        )
    },
]

const rows = [
    { id: 1, paid: false, fullName: 'Joseph Z. Gaitan', orden: '' },
    { id: 2, paid: true, fullName: 'Joseph Z. Gaitan', orden: '' },
    { id: 3, paid: false, fullName: 'Joseph Z. Gaitan', orden: '' },
    { id: 4, paid: true, fullName: 'Joseph Z. Gaitan', orden: '' },
    { id: 5, paid: true, fullName: 'Joseph Z. Gaitan', orden: '' },
    { id: 6, paid: false, fullName: 'Joseph Z. Gaitan', orden: '' },
]

const HistoryPage = () => {
    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component={'h1'}>
                Historial de ordenes
            </Typography>
            <Grid container >
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid disableRowSelectionOnClick rows={rows} columns={columns} />
                </Grid>
            </Grid>
            
        </ShopLayout>
    )
}

export default HistoryPage
