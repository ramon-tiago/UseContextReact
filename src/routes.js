import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Feira from 'pages/Feira'
import Carrinho from 'pages/Carrinho'
import { useState } from 'react'
import { UsuarioContex } from 'common/context/Usuario'

function Router() {
  const [ nome, setNome ] = useState("");
  const [ saldo, setSaldo ] = useState(0);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
            <UsuarioContex.Provider value={{ nome, setNome, saldo, setSaldo }}>
          <Login 

          />
          </UsuarioContex.Provider>
        </Route>
        <Route path="/feira">
          <Feira 
            nome={nome}
            saldo={saldo}
            setSaldo={setSaldo}
          />
        </Route>
        <Route path="/carrinho" >
          <Carrinho />
        </Route>
      </Switch>
    
    </BrowserRouter>
  )
}

export { Router }