import React, { useContext, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Link,
    Box,
    Button,
    IconButton,
    Badge,
    InputAdornment,
    Input,
} from "@mui/material";
import NextLink from "next/link";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UiContext } from "../../../context";


export const Navbar = () => {

    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const { toggleSideMenu } = useContext(UiContext)
    const { asPath, push } = useRouter()
    const [searchTerm, setSearchTerm] = useState('')

    const onSearchTerm = () => {
        setIsSearchVisible(false)
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`)
        setSearchTerm('')
    }

    return (

        <AppBar>
            <Toolbar>
                <NextLink href={"/"} passHref legacyBehavior>
                    <Link display={"flex"} alignItems={"center"}>
                        <Typography variant="h6">Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />

                <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
                    <NextLink href="/category/men" passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombre</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujer</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kid" passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                {
                    isSearchVisible ? (
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                onSearchTerm()
                            }}
                        >
                            <Input
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className="fadeIn"
                            autoFocus
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setIsSearchVisible(false)}
                                    >
                                        <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        </form>
                    ) : (
                        <IconButton
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                            className="fadeIn"
                            onClick={() => setIsSearchVisible(true)}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }

                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink legacyBehavior href={"/cart"} passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button onClick={toggleSideMenu}>Menú</Button>
            </Toolbar>
        </AppBar>
    );
}
