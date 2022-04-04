import React, { createContext, useState } from 'react'

// class Componente extends React.Component {
//   // static contextType = UsuarioContex;
//   render () {
//     return (
//       <>
//       </>
//     )
//   }
// }

// Componente.contextType = UsuarioContex;

const UsuarioContex = createContext();
UsuarioContex.displayName = 'Usuário'

const UsuarioProvider = ({children}) => {
  const [ nome, setNome ] = useState("");
  const [ saldo, setSaldo ] = useState(0);
  return (
    <UsuarioContex.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children}
    </UsuarioContex.Provider>
  )
}

export { UsuarioContex, UsuarioProvider }