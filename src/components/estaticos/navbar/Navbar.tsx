import React from 'react';
import { AppBar, Toolbar, Typography, Box, Color } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import {toast} from 'react-toastify';

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    
    let history = useNavigate()
    const dispatch = useDispatch()

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        history("/login")
    }

    var navbarComponent;
    
    if(token != ""){
        navbarComponent = <AppBar className='barra' position="static">
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
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;