import React from 'react';
import { AppBar, Toolbar, Typography, Box, Color } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
function Navbar() {

    let history = useNavigate()

    const [token, setToken] = useLocalStorage('token')

    function goLogout() {
        setToken('')

        alert("Usuário deslogado")
        history("/login")
    }

    return (
        <>
            <AppBar className='barra' position="static">
                <Toolbar className='texto-direita' variant="dense">
                    <Box className='cursor' >
                        <Typography className='texto2' variant="h5" >
                            Spaceship Mavi
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="start">
                        <Link to="/Home" className='text-decorator-none'>
                            <Box mx={1} className='cursor'>
                                <Typography className='fonte-mono' variant="h6" color="inherit">
                                    home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/postagens" className='text-decorator-none'>
                            <Box mx={1} className='cursor'>
                                <Typography className='fonte-mono' variant="h6" color="inherit">
                                    postagens
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/temas" className='text-decorator-none'>
                            <Box mx={1} className='cursor'>
                                <Typography className='fonte-mono' variant="h6" color="inherit">
                                    temas
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/formularioTema" className='text-decorator-none'>
                            <Box mx={1} className='cursor'>
                                <Typography className='fonte-mono' variant="h6" color="inherit">
                                    cadastrar  tema
                                </Typography>
                            </Box>
                        </Link>

                        <Box mx={1} className='cursor' onClick={goLogout}>
                            <Typography className='fonte-mono' variant="h6" color="inherit">
                                logout
                            </Typography>
                        </Box>


                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;