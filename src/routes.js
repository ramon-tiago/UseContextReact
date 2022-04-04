import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'
import { UsuarioProvider } from 'common/context/Usuario'
import { CarrinhoProvider } from 'common/context/Carrinho'
import { PagamentoProvider } from 'common/context/Pagamento'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PagamentoProvider>
          <UsuarioProvider>
            <Route exact path="/">
              <Login />
            </Route>
            <CarrinhoProvider>
              <Route path="/feira">
                <Feira />
              </Route>
              <Route path="/carrinho">
                <Carrinho />
              </Route>
            </CarrinhoProvider>
          </UsuarioProvider>
        </PagamentoProvider>
      </Switch>
    
    </BrowserRouter>
  )
}

export { Router }