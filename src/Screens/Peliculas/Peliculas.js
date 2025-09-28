import React, { Component } from "react"
import PeliculasCards from "./PeliculasCards"

class Peliculas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      busqueda: "", 
      copiaDatos: [], 
      page: 1,
      totalPages: "",
      carga: true 
    }
  }

  componentDidMount() {
    console.log("https://api.themoviedb.org/3/discover/movie?api_key=cc9626b1c01cc6df9ddb2a9c71454130&page=1");

    fetch("https://api.themoviedb.org/3/discover/movie?api_key=cc9626b1c01cc6df9ddb2a9c71454130&page=1")
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
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=cc9626b1c01cc6df9ddb2a9c71454130&page=${this.state.page + 1}`)
      .then(response => response.json())
      .then(data => this.setState(
        {
          datos: [...this.state.datos, ...data.results],
          copiaDatos: [...this.state.datos, ...data.results],
          page: this.state.page + 1
        }))
      .catch(error => console.log(error));
  }

  prevenirRecarga(event) {
    event.preventDefault()

  }

  filtrarPeliculas(event) {
    let busqueda = event.target.value 
    this.setState({
      busqueda: busqueda,
      datos: this.state.copiaDatos.filter(pelicula => pelicula.original_title.toLowerCase().includes(busqueda.toLowerCase()))
    }, () => console.log(this.state.datos, busqueda)
    )
  }

  render() {
    return (
      <>
        <h2 className="alert alert-primary">Todas las películas</h2>

        <form className="filter-form px-0 mb-3" action="" method="get" onSubmit={(event) => this.prevenirRecarga(event)}>
          <input type="text" name="filter" id="" placeholder="Buscar dentro de la lista" onChange={(event) => this.filtrarPeliculas(event)} value={this.state.busqueda} ></input>
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
        <section className="row cards all-movies" id="movies">
            {
              this.state.carga ? ( 
                <h3> Cargando... </h3> 
              ) : this.state.datos.length === 0 ? ( 
                <h3>No se encontraron resultados de búsqueda</h3>
              ) : (
                this.state.datos.map((pelicula) => ( 
                  <PeliculasCards key={pelicula.id} pelicula={pelicula} />
                ))
              )
            }
        </section>
        {this.state.page < this.state.totalPages && (
          <button className="btn btn-info btn-sm" onClick={() => this.apiCall()}>Más Peliculas</button>
        )
        }
      </>
    );
  }
}


export default Peliculas; 