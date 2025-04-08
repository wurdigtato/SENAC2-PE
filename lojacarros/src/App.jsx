import { useState, useEffect } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, setFocus } = useForm();
  const [entrada, setEntrada] = useState('');
  const [parcela, setParcela] = useState('');
  const [veiculo, setVeiculo] = useState('');

  function calcularParcela(data) {
    const valorEntrada = Number(data.price) - Number(data.price) * 0.5;
    const valorParcela = valorEntrada / 12;
    setEntrada(`Valor da entrada: ${valorEntrada}`);
    setParcela(
      `Valor do saldo em 12x: R$${valorParcela.toLocaleString('pt-br', {
        maximumFractionDigits: 2,
      })}`
    );
    setVeiculo(`Veículo: ${data.model}`);
  }

  function limparCampos() {
    setEntrada('');
    setParcela('');
    setVeiculo('');
  }

  useEffect(() => {
    setFocus('model');
  });

  return (
    <>
      <div className="container">
        <h1>Concessionária Avenida</h1>
        <hr />
        <form onSubmit={handleSubmit(calcularParcela)} onReset={limparCampos}>
          <div className="formularios">
            <p>
              <label htmlFor="model">Modelo: </label>
              <input
                type="text"
                id="model"
                className="campo"
                {...register('model')}
                autoComplete="off"
                required
              />
            </p>
            <p>
              <label htmlFor="price">Preço: </label>
              <input
                type="number"
                id="price"
                className="campo"
                {...register('price')}
                autoComplete="off"
                required
              />
            </p>
          </div>
          <input type="submit" value="Calcular" className="btn" />
          <input type="reset" value="Limpar" className="btn reset" />
        </form>
        <div className="resposta">
          <h4>{veiculo}</h4>
          <p>{entrada}</p>
          <p>{parcela}</p>
        </div>
      </div>
    </>
  );
}

export default App;
