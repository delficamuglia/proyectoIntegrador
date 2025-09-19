import React, { Component } from "react"
import SeriesCards from "./SeriesCards"

class Series extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      busqueda: "", //esta variable contendrá aquello que buscará el usuario en el formulario. 
      copiaDatos: [], //establecemos esta variable ya que cuando realizamos el filter en datos, si no guardamos una variable con los datos originales perderíamos los datos que trajimos en primer lugar. De esta manera, mantenemos los datos originales en copiaDatos.
      page: 1,
      totalPages: "",
      carga: true 
    }
  }

  componentDidMount() {
    console.log("https://api.themoviedb.org/3/discover/tv?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1");

    fetch("https://api.themoviedb.org/3/discover/tv?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1")
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results,
        copiaDatos: data.results,
        page: 1,
        totalPages: data.total_pages,
        carga: false 
      }))
      .catch(error => console.log(error));
  }

  apiCall() {
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=${this.state.page + 1}`)
      .then(response => response.json())
      .then(data => this.setState(
        {
          datos: [...this.state.datos, ...data.results], //mediante esta línea se muestran las series que ya teníamos en el array datos y se agregan las nuevas que vinieron en data.results.
          copiaDatos: [...this.state.datos, ...data.results],
          page: this.state.page + 1
        }))
      .catch(error => console.log(error));
  }

  prevenirRecarga(event) {
    event.preventDefault()

  }

  filtrarSeries(event) {
    let busqueda = event.target.value //traemos la búsqueda del usuario mediante la propiedad event. Esta se pasa como parámetro en el evento, en este caso onChange y trae consigo diferentes propiedades. Target es una de ellas y muestra el <input> que hizo que se disparará el evento. Value nos traerá el valor dentro del input. 
    this.setState({
      busqueda: busqueda,
      datos: this.state.copiaDatos.filter(serie => serie.original_name.toLowerCase().includes(busqueda.toLowerCase()))
    }, () => console.log(this.state.datos, busqueda)
    )
  }

  render() {
    return (
      <>
        <h2 className="alert alert-warning">Todas las series</h2>

        <form className="filter-form px-0 mb-3" action="" method="get" onSubmit={(event) => this.prevenirRecarga(event)}>
          <input type="text" name="filter" id="" placeholder="Buscar dentro de la lista" onChange={(event) => this.filtrarSeries(event)} value={this.state.busqueda} ></input>
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
        <section className="row cards all-series" id="series">
            {
              this.state.carga ? ( //Si carga es true
                <h3> Cargando... </h3> //mostramos el mensaje
              ) : this.state.datos.length === 0 ? ( // si no esta cargando, resultados de busqueda = 0, por ende, mostramos mensaje de que no hay resultados de busqueda
                <h3>No se encontraron resultados de búsqueda</h3> 
              ) : (
                this.state.datos.map((serie) => ( //si que el length de los resultados es 0 es falso, y que la app esta cargando es falso entonces mapeamos los resultados y los mostramos 
                  <SeriesCards key={serie.id} serie={serie} />
                ))
              )
            }
        </section>
        {this.state.page < this.state.totalPages && (
          <button className="btn btn-info btn-sm" onClick={() => this.apiCall()}>Más Series</button>
        )
        }
      </>
    );
  }
}


export default Series; 