import { set, useForm } from 'react-hook-form';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const { register, handleSubmit, setFocus } = useForm();
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');

  function calcularMedia(data) {
    const mediaFinal = (Number(data.nota1) + Number(data.nota2)) / 2;
    if (mediaFinal <= 6) {
      setMensagem(`Aluno: ${data.nome} | Média ${mediaFinal}`);
      setStatus(`Reprovado`);
      setStatusColor('red');
    } else {
      setMensagem(`Aluno: ${data.nome} | Média ${mediaFinal}`);
      setStatus(`Aprovado`);
      setStatusColor('green');
    }
  }

  function limparCampo() {
    setMensagem('');
    setStatus('');
    setStatusColor('');
    setFocus('nome');
  }

  useEffect(() => {
    setFocus('nome');
  }, []);

  return (
    <>
      <div className="container">
        <h1>Escola Avenida</h1>
        <h3>Cálculo de Média</h3>
        <form
          className="formulario"
          onSubmit={handleSubmit(calcularMedia)}
          onReset={limparCampo}
        >
          <p>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              className="campo"
              autoComplete="off"
              {...register('nome')}
              required
            />
          </p>
          <p>
            <label htmlFor="nota1">1ª Nota: </label>
            <input
              type="number"
              id="nota1"
              placeholder="1ª Nota"
              className="campo"
              autoComplete="off"
              {...register('nota1')}
              required
            />
          </p>
          <p>
            <label htmlFor="nota2">2ª Nota:</label>
            <input
              type="text"
              id="nota2"
              placeholder="2ª Nota"
              className="campo"
              autoComplete="off"
              {...register('nota2')}
              required
            />
          </p>
          <div className="resposta">
            <h4>{mensagem}</h4>
            <h4 className={statusColor}>{status}</h4>
          </div>
          <div className="btn-container">
            <input type="submit" value="Calcular" className="btn" />
            <input type="reset" value="Limpar" className="btn reset" />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
