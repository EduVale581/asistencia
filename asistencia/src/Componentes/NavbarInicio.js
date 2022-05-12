import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../Context/AuthContext';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from "react-router-dom"


export default function NavbarInicio(props) {
    const { navBarActivo } = props;
    const { currentUser, logout } = useAuth();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const cerrarSesion = async (e) => {
        setLoading(true);
        try {
            await logout();

        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    style={{ marginLeft: "10px" }}
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    <img src="/static/images/LogoBlanco.svg" width="50" height="50" alt="Logo" />
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {navBarActivo === "Inicio" ? (
                            <div>
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center" color="primary">Inicio</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">Cursos</Typography>
                                </MenuItem>
                            </div>

                        ) : (
                            <div>
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center" >Inicio</Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center" color="primary">Cursos</Typography>
                                </MenuItem>
                            </div>

                        )
                        }
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                    <img src="/static/images/LogoBlanco.svg" width="50" height="50" alt="Logo" />
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {navBarActivo === "Inicio" ? (
                        <div style={{ height: "100%" }}>
                            <Button

                                onClick={() => {
                                    navigate=("/");
                                }}
                                style={{ backgroundColor: "#661323", color: "white", height: "100%" }}

                            >
                                Inicio
                            </Button>
                            <Button
                                onClick={() => {
                                  navigate("/Historial");
                                }}
                                style={{ color: 'white', height: "100%" }}
                            >
                                Módulos
                            </Button>
                        </div>

                    ) : (
                        <div>
                            <Button

                                onClick={() => {
                                  navigate("/");
                                }}
                                sx={{ my: 2, color: 'white' }}

                            >
                                Inicio
                            </Button>
                            <Button
                                onClick={handleCloseNavMenu}
                                style={{ backgroundColor: "#661323", color: "white" }}

                            >
                                Módulos
                            </Button>
                        </div>

                    )
                    }


                </Box>

                <Box sx={{ flexGrow: 0 }} style={{ marginRight: "10px" }}>
                    <Tooltip title="Ajustes">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem>
                            <Typography variant='caption' textAlign="center" color="primary">{currentUser.email}</Typography>
                        </MenuItem>

                        <MenuItem>
                            <LoadingButton
                                loading={loading}
                                onClick={cerrarSesion}
                                variant="contained"
                                fullWidth
                            >
                                <Typography textAlign="center">Cerrar Sesión</Typography>

                            </LoadingButton>

                        </MenuItem>

                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
