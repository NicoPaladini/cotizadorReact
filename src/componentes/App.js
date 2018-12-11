import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from './helper';
import Resumen from './Resumen';



class App extends Component {

  state = {
        resultado: '',
        datos: {}
  }

  cotizarSeguro = (datos) => {
        const {marca, plan, year} = datos;

        //Agregar una base de 2000
        let resultado = 2000;

        //Obtener la diferencia segun los años
        const diferencia = obtenerDiferenciaAnio(year);

        
        
        //restar 3% por cada año menos
resultado -= ((diferencia * 3) * resultado ) / 100;


        //Americano 15$, Asiatico 5%, y europeo 30% de recargo

        resultado = calcularMarca(marca) * resultado;

        //Incremento segun plan basico o completo

        let incrementoPlan = obtenerPlan(plan);

        //Dependiendo del plan incrementar
        //La funcion parseFloat hace el redondeo del resultado

        resultado = parseFloat(incrementoPlan *  resultado).toFixed(2);

        console.log(resultado);

        //Creamos un objeto para incluir los datos de la cotizacion y luego enviarlo
        //al state
        const datosAuto = {
          marca: marca,
          plan: plan,
          year: year
        }

        //Enviamos el costo al state
        this.setState({
          resultado: resultado,
          datos: datosAuto
        })

  }

  render() {
    return (
      <div className="contenedor">
        <Header 
           titulo = 'Cotizador de Seguro de Auto'
        />
        <div className="contenedor-formulario">
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen 
            datos={this.state.datos}
            resultado={this.state.resultado}
          />
        </div>
      </div>
    );
  }
} 

export default App;
