import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm();

  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0)

  function adicionaLanche(data) {
    const produtos2 = [
      ...produtos,
      {
        lanche: data.lanche,
        qnt: Number(data.qnt),
        preco: Number(data.preco),
        subtotal: Number(data.qnt) * Number(data.preco),
      },
    ];

    const total2 = total +  Number(data.qnt) * Number(data.preco);
    
    setProdutos(produtos2);
    setTotal(total2)
  }

  const listaProdutos = produtos.map((produto) => (
    <tr>
      <td>{produto.qnt}</td>
      <td>{produto.lanche}</td>
      <td>{produto.preco.toLocaleString("pt-br", {minimumFractionDigits: 2})}</td>
      <td>{produto.subtotal.toLocaleString("pt-br", {minimumFractionDigits: 2})}</td>
    </tr>
  ));

  function limpar(){
    setProdutos([])
    setTotal(0)
    reset({
      lanche: "",
      qnt: "",
      preco: ""
    })
    setFocus("lanche") 
  }

  useEffect(() => {
    setFocus("lanche")
  }, [setFocus])

  return (
    <div className="container">
      <header>
        <img src="./logo.png" alt="" />
        <h1>Lancheria Avenida</h1>
      </header>
      <main>
        <div className="formularios-containers">
          <h2>Faça seu pedido</h2>
          <form onSubmit={handleSubmit(adicionaLanche)} onReset={limpar}>
            <p>
              <label htmlFor="lanche">Descrição: </label>
              <textarea
                name=""
                id="lanche"
                placeholder="Digite a descrição aqui..."
                {...register("lanche")}
                required
              ></textarea>
            </p>
            <p>
              <label htmlFor="qnt">Quantidade: </label>
              <select id="qnt" {...register("qnt")} required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </p>
            <p>
              <label htmlFor="preco">Preço R$: </label>
              <input
                type="number"
                name=""
                id="preco"
                step="0.10"
                min="1"
                {...register("preco")}
                required
              />
            </p>
            <input type="submit" value="Enviar" className="btn" />
            <input type="reset" value="Limpar" className="btn reset"/>
          </form>
        </div>
        <div className="pedidos-container">
          <h3>Produtos Inseridos no Pedido</h3>
          <table>
            <thead>
              <tr>
                <th>Quant.</th>
                <th>Nome do Lanche</th>
                <th>Preço R$</th>
                <th>Subtotal R$</th>
              </tr>
            </thead>
            <tbody>{listaProdutos}</tbody>
          </table>
          {total > 0 &&
          <h2>
            Total do Pedido R$: <span className="destaque">{total.toLocaleString("pt-br", {minimumFractionDigits: 2 })}</span>
          </h2>}
        </div>
      </main>
    </div>
  );
}

export default App;
