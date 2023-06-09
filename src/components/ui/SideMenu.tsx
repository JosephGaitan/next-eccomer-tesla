import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react"
import { UiContext } from "../../../context"
import { useRouter } from "next/router"


export const SideMenu = () => {

    const router = useRouter()

    const { isOpenMenu, toggleSideMenu } = useContext(UiContext)

    const [searchTerm, setSearchTerm] = useState('')

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url: string) => {
        toggleSideMenu()
        router.push(url)
        setSearchTerm('')
    }

    return (
        <Drawer
            onClose={toggleSideMenu}
            open={isOpenMenu}
            anchor='right'
            sx={{ transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>


                    <form
                        onSubmit={
                            e=>{ 
                            e.preventDefault()
                            onSearchTerm()
                            }
                        }
                    >

                        <ListItem>
                            <Input
                                autoFocus
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                type='text'
                                placeholder="Buscar en el sitio web"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onSearchTerm}
                                        >
                                            <SearchOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </ListItem>
                    </form>

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItem>

                    <ListItem onClick={() => navigateTo('/orders/history')} button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItem>


                    <ListItem onClick={() => navigateTo('/category/men')} button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem onClick={() => navigateTo('/category/women')} button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem onClick={() => navigateTo('/category/kid')} button sx={{ display: { xs: '', sm: 'none' } }}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>


                    <ListItem onClick={() => navigateTo('/auth/login')} button>
                        <ListItemIcon>
                            <VpnKeyOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}