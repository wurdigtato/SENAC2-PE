import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const [valorSeguro, setValorSeguro] = useState(0);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [parcela, setParcela] = useState(0);
  const [isView, setIsView] = useState(false);

  function calcularSeguro(data) {
    setIsView(true)  
    let valorSeguro = 0;
    let parcela = 0
    if(data.sex === "homem") {
      valorSeguro = Number(data.price) * 0.03;
    } else {
      valorSeguro = Number(data.price) * 0.02;
    }

    if (data.isRenewal == "cliente") {
      valorSeguro = valorSeguro - (valorSeguro * 0.1);
    }

    parcela = valorSeguro / 24;

    setValorSeguro(valorSeguro)
    setMarca(data.brand)
    setModelo(data.model)
    setParcela(parcela)
  }

  function limparCampos() {
    setValorSeguro(0);
    setModelo('');
    setMarca('');
    setParcela(0);
    setIsView(false);
  }

  return (
    <>
      <div className="container">
        <header>
          <img src="./logo.png" alt="" />
          <div className="header__content">
            <h1>Avenida Seguros</h1>
            <hr />
            <h2>App Seguro de Veículos</h2>
          </div>
        </header>
        <main>
          <form className="formulario" onSubmit={handleSubmit(calcularSeguro)} onReset={limparCampos}>
            <p className="form__container">
              <label htmlFor="model">Modelo do Veículo: </label>
              <input
                type="text"
                id="model"
                className="campo"
                {...register("model")}
              />
            </p>
            <p className="form__container">
              <label htmlFor="brand">Marca: </label>
              <select id="brand" className="seletor" {...register("brand")}>
                <option value="Audi">Audi</option>
                <option value="BMW">BMW</option>
                <option value="BYD">BYD</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Ford">Ford</option>
                <option value="Fiat">Fiat</option>
                <option value="GM">General Motors - GM</option>
                <option value="Honda">Honda</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Jeep">Jeep</option>
                <option value="Kia">Kia</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Lexus">Lexus</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Nissan">Nissan</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Renault">Renault</option>
                <option value="Volkswagen">Volkswagen</option>
              </select>
            </p>
            <p className="form__container">
              <label htmlFor="price">Preço R$: </label>
              <input
                type="text"
                id="price"
                className="campo"
                {...register("price")}
              />
            </p>
            <div className="radio__container">
              <label htmlFor="driver">Principal Condutor: </label>
              <div className="radio__input">
                <input
                  type="radio"
                  id="driver"
                  value="homem"
                  {...register("sex")}
                />
                <p>Homem</p>
              </div>
              <div className="radio__input">
                <input
                  type="radio"
                  id="driver"
                  value="mulher"
                  {...register("sex")}
                />
                <p>Mulher</p>
              </div>
            </div>
            <div className="client__container">
              <label htmlFor="client">Cliente Avenida</label>
              <div className="client__input">
                <input
                  type="checkbox"
                  id="client"
                  value="cliente"
                  {...register("isRenewal")}
                />
                <p>É Renovação?</p>
              </div>
            </div>

            <div className="|">
              <input type="submit" value="Simular Seguro" className="btn" />
              <input type="reset" value="Limpar Dados" className="btn reset" />
            </div>
          </form>
          {isView &&
            <div className="mensagens">
            <h4>
              Simulado de Seguro: <span>{`${marca} - ${modelo}`}</span>
            </h4>
            <h5>
              Valor Total para 2 Anos: R$<span>{valorSeguro}</span>
            </h5>
            <h5>
              ou Em 24x de R$<span>{parcela}</span>
            </h5>
          </div>}
        </main>
      </div>
    </>
  );
}

export default App;
