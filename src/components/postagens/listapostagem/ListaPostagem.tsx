import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import Postagem from '../../../models/Postagem'
import { busca } from '../../../services/Service'

import './ListaPostagem.css'
import { toast } from 'react-toastify'


function ListaPostagem() {

  let history = useNavigate()
  const [posts, setPost] = useState<Postagem[]>([])

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token === "") {
      toast.warn('Você precisa estar logado', {
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
  }, [token])

  async function getPost() {
    await busca("/postagens", setPost, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getPost()
  }, [posts.length])

  return (
    <>
      <Grid container className='caixa-grid'>
      {posts.map(post => (
      

          <Box className='caixa-post' m={2}  >
            <Card className='back-card' variant="outlined">
              <CardContent >

                <Typography className='fonte-mono' color="textSecondary" gutterBottom>
                  Postagens
                </Typography>

                <Typography className='fonte-mono' variant="h5" component="h2">
                  {post.titulo}
                </Typography>

                <Typography className='fonte-mono' variant="body2" component="p">
                  {post.texto}
                </Typography>

                <Typography className='pd-30 text-gray fonte-mono' variant="body2" component="p">
                  {post.tema?.descricao}
                </Typography>

              </CardContent>

              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft botao" size='small' >
                        Atualizar
                      </Button>
                    </Box>
                  </Link>

                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' className='botao2'>
                        Deletar
                      </Button>
                    </Box>
                  </Link>

                </Box>
              </CardActions>

            </Card>
          </Box>
        
      ))}
      </Grid>
    </>
  )
}

export default ListaPostagem