import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UsuarioContex } from 'common/context/Usuario';

function Login() {
  
  const history = useHistory()
  return (
    <Container>
      <UsuarioContex.Consumer>
        {({ nome, setNome, saldo, setSaldo }) => (
          <>
            <Titulo>
              Insira o seu nome
            </Titulo>
            <InputContainer>
              <InputLabel>
                Nome
              </InputLabel>
              <Input
              value={nome}
              onChange={ev => setNome(ev.target.value)}
                type="text"
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>
                Saldo
              </InputLabel>
              <Input
              type="number"
              value={saldo}
              onChange={ev => setSaldo(ev.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  R$
                </InputAdornment>
              }
            />
            </InputContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/feira")}
            >
              Avançar
            </Button>
          </>
        )}
      </UsuarioContex.Consumer>
    </Container>
  )
};

export default Login;