import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Box, Paper, Typography, Button, TextField, FormHelperText } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom'
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';


import './CadastroUsuario.css';
import { toast } from 'react-toastify';


function CadastrarUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    const [userResult, setUserResult] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (userResult.id !== 0) {
            navigate("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (confirmarSenha === user.senha && user.senha.length >= 8) {

            try {
                cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
                toast.success('Usuario cadastrado com sucesso', {
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
                console.log(`Error: ${error}`)
                toast.error('Erro ao cadastrar o Usuário', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                });
            }

        } else {
            toast.error('Dados inconsistentes. Verifique as informações de cadastro.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });

            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'></Grid>
            <Grid item xs={6} alignItems='center'>
                <Paper style={{ padding: '30px' }} elevation={6}>
                    <Box paddingX={10}>
                        <form onSubmit={cadastrar}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
                            <TextField
                                value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='nome' label='nome' variant='outlined'
                                name='nome' margin='normal' fullWidth
                                placeholder='Insira seu nome'
                                required />


                            <TextField
                                value={user.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='usuario' label='usuario' variant='outlined'
                                name='usuario' margin='normal' fullWidth
                                placeholder='Insira um email válido'
                                required />

                            <TextField
                                value={user.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                                id='senha' label='senha' variant='outlined'
                                name='senha' margin='normal' type='password' fullWidth
                                placeholder='Insira no mínimo 8 caracteres'
                                required />

                            <TextField
                                value={confirmarSenha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)}
                                id='confirmarSenha' label='confirmarSenha' variant='outlined'
                                name='confirmarSenha' margin='normal' type='password' fullWidth
                                placeholder='Insira novamente a senha'
                                required />

                            <FormHelperText>*Campo obrigatório</FormHelperText>

                            <Box className='box-botao t-log2' marginTop={2} textAlign='center'>
                                <Link to='/login' className='text-decorator-none'>
                                    <Button variant='contained' className='botao2'>
                                        Cancelar
                                    </Button>
                                </Link>

                                <Button className='botao t-log2' type='submit' variant='contained' >
                                    Cadastrar
                                </Button>

                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default CadastrarUsuario;