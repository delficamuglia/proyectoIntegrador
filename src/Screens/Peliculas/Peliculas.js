import React, { Component } from "react"
import PeliculasCards from "../Peliculas/PeliculasCards"

class Peliculas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      //nextPage: "" ¿cómo hago para que cambie de pag?
    }
  }

  componentDidMount() {
    console.log("https://api.themoviedb.org/3/movie/popular?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1");

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1")
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results,
        //nextPage: data.info.next
      }))
      .catch(error => console.log(error));
  }



  render() {
    return (
      <>
        <section >
          <article className="popular">
            <h2>Peliculas más populares</h2>
          </article>
          <article className="card-container">
            {
              this.state.datos.length === 0
                ? <h3>Cargando...</h3>
                : this.state.datos.map((pelicula, idx) => (<PeliculasCards key={pelicula.id} pelicula={pelicula} />))
            }
          </article>
        </section>
      </>
    )
  }
}

export default Peliculas; 