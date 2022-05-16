import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';

import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

function Login() {

    let history = useNavigate()
    const dispatch = useDispatch()
    const [token, setToken] = useState('')

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        usuario: "",
        senha: "",
        token: ""
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token !== "") {
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login('/usuarios/logar', userLogin, setToken)
            toast.success('Usuário logado com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });

        } catch (error) {
            toast.error('Dados do usuário inconsistentes', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        };
    }

    return (
        <Grid className='box-form' container direction='row' justifyContent='center' alignItems='center'>
            <Grid xs={6}>
                
                <Paper style={{ padding: '30px' }} elevation={6}>
                    <Box paddingX={20}>

                        <form onSubmit={onSubmit}>
                        <div>
                    <Typography
                    variant='h2' gutterBottom
                        color='textPrimary'
                        component='h2'
                        align='center'
                        className='textos1 fonte-mono t-log'
                        style={{fontSize:'50px'}}>
                            Spaceship Mavi

                    </Typography>
                </div>
                            <Typography variant='h5' gutterBottom
                                color='textPrimary'
                                component='h5'
                                align='center'
                                className='textos1 fonte-mono'>Entrar</Typography>

                            <TextField
                                value={userLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updatedModel(e)} id='usuario' label='usuário'
                                variant='outlined'
                                name='usuario'
                                margin='normal'
                                fullWidth />
                            <TextField
                                value={userLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    updatedModel(e)}
                                id='senha'
                                label='senha'
                                variant='outlined'
                                name='senha'
                                margin='normal'
                                type='password'
                                fullWidth />

                            <Box className='t-log' marginTop={2} textAlign='center'>
                                <Button type='submit' variant='contained' className='botao '>
                                    Logar
                                </Button>
                            </Box>

                        </form>

                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1'
                                    gutterBottom align='center'
                                    className='fonte-mono'>Não tem uma conta?</Typography>
                            </Box>
                            <Link className='text-decoration-none' to='/cadastrousuario'>
                                <Typography variant='subtitle1'
                                    gutterBottom align='center'
                                    style={{fontWeight:'bold'}}
                                    className='textos1 fonte-mono'>Cadastre-se</Typography>
                            </Link>
                        </Box>

                    </Box>
                </Paper>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    )
}

export default Login