import { usePagamentoContext } from "./Pagamento";
import { UsuarioContex } from "./Usuario";

const { createContext, useState, useContext, useEffect } = require("react");

const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho'

const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])
  const [quantidadeProdutos, setQuantidadeProdutos ] = useState(0)
  const [valorTotalCarrinho, setValorTotalCarrinho ] = useState(0)
  return (
    <CarrinhoContext.Provider 
      value={{ 
        carrinho, 
        setCarrinho,
        quantidadeProdutos,
        setQuantidadeProdutos,
        valorTotalCarrinho,
        setValorTotalCarrinho
      }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

function useCarrinhoContext() {
  const { 
    carrinho, 
    setCarrinho, 
    quantidadeProdutos, 
    setQuantidadeProdutos,
    valorTotalCarrinho,
    setValorTotalCarrinho,
  } = useContext(CarrinhoContext)
  const { formaPagamento } = usePagamentoContext()

  const { setSaldo } = useContext(UsuarioContex)

  const mudarQuantidade = (id, quantidade) => carrinho.map(item => {
    if (item.id === id) item.quantidade += quantidade;
    return item;
  });

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(item => item.id === novoProduto.id);
    let novoCarrinho = [...carrinho];
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      novoCarrinho.push(novoProduto);
      return setCarrinho(novoCarrinho);
    } 
    novoCarrinho = mudarQuantidade(novoProduto.id, 1);
    setCarrinho(novoCarrinho);
  };

  function removerProduto(id) {
    const produto = carrinho.find(item => item.id === id);
    const ultimo = produto.quantidade === 1;
    let novoCarrinho;
    if (ultimo) {
      novoCarrinho = carrinho.filter(item => item.id !== id);
      return setCarrinho(novoCarrinho);
    } 
    novoCarrinho = mudarQuantidade(id, -1);
    setCarrinho(novoCarrinho);
  }

  function efetuarCompra() {
    setCarrinho([])
    setSaldo((saldo) => saldo - valorTotalCarrinho)
  }
  useEffect(() => {
    const { newValor, novaQuantidade } = carrinho.reduce((contador, produto) => 
      ({
        novaQuantidade: contador.novaQuantidade + produto.quantidade,
        newValor: contador.newValor + (produto.valor * produto.quantidade)
      }), {
        novaQuantidade: 0,
        newValor: 0
      });
    setQuantidadeProdutos(novaQuantidade)
    setValorTotalCarrinho(newValor * formaPagamento.juros )
  },[carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento])

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    quantidadeProdutos,
    setQuantidadeProdutos,
    valorTotalCarrinho,
    efetuarCompra,
  }

}



export { CarrinhoContext, CarrinhoProvider, useCarrinhoContext }