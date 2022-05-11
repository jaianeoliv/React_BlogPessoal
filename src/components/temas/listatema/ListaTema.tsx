import React, { useState, useEffect } from 'react'
import { Box, Paper, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import Tema from '../../../models/Tema'
import { busca } from '../../../services/Service'

import './ListaTema.css'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify';

function ListaTema() {

  let history = useNavigate()

  const [temas, setTemas] = useState<Tema[]>([])

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );


  useEffect(() => {
    if (token === "") {
      toast.error('Você precisa estar logado', {
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
  }, [token])

  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>
      {
        temas.map(tema => (
          <Box m={2} >
            <Card className='back-card' variant="outlined">
              <CardContent>

                <Typography color="textSecondary" gutterBottom>
                  Tema
                </Typography>

                <Typography variant="h5" component="h2">
                  {tema.descricao}
                </Typography>

              </CardContent>

              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >

                  <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button startIcon={<DeleteIcon fontSize="small" />} variant="contained" size='small' className='botao2'>
                        Deletar
                      </Button>
                    </Box>
                  </Link>
                  
                  <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" endIcon={<SendIcon />} className="marginLeft botao" size='small' >
                        Atualizar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>

            </Card>
          </Box>
        ))}
    </>
  )
}

export default ListaTema