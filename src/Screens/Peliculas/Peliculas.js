import React, { Component } from "react"
import PeliculasCards from "../Peliculas/PeliculasCards"

class Peliculas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      busqueda: "", //esta variable contendrá aquello que buscará el usuario en el formulario. 
      copiaDatos: [], //establecemos esta variable ya que cuando realizamos el filter en datos, si no guardamos una variable con los datos originales perderíamos los datos que trajimos en primer lugar. De esta manera, mantenemos los datos originales en copiaDatos.
      page: 1,
      totalPages: "",
      seleccionada: false
    }
  }

  componentDidMount() {
    console.log("https://api.themoviedb.org/3/movie/popular?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1");

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1")
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results,
        copiaDatos: data.results,
        page: 1,
        totalPages: data.total_pages
      }))
      .catch(error => console.log(error));
  }

  apiCall() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=${this.state.page + 1}`)
      .then(response => response.json())
      .then(data => this.setState(
        {
          datos: [...this.state.datos, ...data.results], //mediante esta línea se muestran las peliculas que ya teníamos en el array datos y se agregan las nuevas que vinieron en data.results.
          copiaDatos: [...this.state.datos, ...data.results],
          page: this.state.page + 1
        }))
      .catch(error => console.log(error));
  }

  prevenirRecarga(event) {
    event.preventDefault()

  }

  filtrarPeliculas(event) {
    let busqueda = event.target.value //traemos la búsqueda del usuario mediante la propiedad event. Esta se pasa como parámetro en el evento, en este caso onChange y trae consigo diferentes propiedades. Target es una de ellas y muestra el <input> que hizo que se disparará el evento. Value nos traerá el valor dentro del input. 
    this.setState({
      busqueda: busqueda,
      datos: this.state.copiaDatos.filter(pelicula => pelicula.original_title.toLowerCase().includes(busqueda.toLowerCase()))
    }, () => console.log(this.state.datos, busqueda)
    )
  }

  render() {
    return (
      <>
        <section >
          <form className="formularioFiltrar" onSubmit={(event) => this.prevenirRecarga(event)}>
            <input className="inputFiltrar" type="text" onChange={(event) => this.filtrarPeliculas(event)} value={this.state.busqueda} />
          </form>
          <article className="popular">
            <h2>Peliculas más populares</h2>
          </article>
          <article className="peliculaCard">
            {
              this.state.datos.length === 0
                ? <h3>Cargando...</h3>
                : this.state.datos.map((pelicula, idx) => (<PeliculasCards key={pelicula.id} pelicula={pelicula} />))
            }
          </article>
          {this.state.page < this.state.totalPages && (
            <button onClick={() => this.apiCall()}>Más Peliculas</button>
          )
          }
        </section>
      </>
    )
  }
}

export default Peliculas; 