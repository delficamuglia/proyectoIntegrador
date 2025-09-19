import React, { Component } from "react"
import PeliculasCards from "../Peliculas/PeliculasCards"
import SeriesCards from "../Series/SeriesCards"
// cuando buscas otra cosa hay que recargar todo VER ESO Y PREGUNTAR

class ResultadosBusqueda extends Component {
  constructor(props) {
    super(props)
    this.state = {
        elementos: [],
        cargando: true
    }
  }

  componentDidMount() {
    const query = this.props.match.params.query;
    const tipo = this.props.match.params.tipo; 
    const API_KEY = "cc9626b1c01cc6df9ddb2a9c71454130";

    let url = "";

    if (tipo === "movie") {
        url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`;
    } else if (tipo === "tv") {
        url = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}`;
    }
    
  
    fetch(url)
      .then(res => res.json())
      .then((data)=>{
        console.log(data)
        this.setState({ elementos: data.results, cargando: false })
    
      })
      .catch((error)=>{
        console.log(error)
     
      });
  }

  render(){
  
    return (
      <>

        <h2 className="alert alert-primary">
            
     
        </h2>
        <section className="row cards all-movies" id="movies">
            {this.state.cargando ? ( 
                <h3>Cargando...</h3> 
              ) : 
               this.state.elementos.length === 0 ? ( 
                <h3>No se encontraron resultados de búsqueda</h3> 
              ) : (
                this.state.elementos.map((elemento) => ( 
                 this.props.match.params.tipo === 'movie' ? <PeliculasCards key={elemento.id} pelicula={elemento} /> : <SeriesCards key={elemento.id} serie={elemento} /> 
                ))
              )
            }
        </section>

       
      </>
    )
  }
}

export default ResultadosBusqueda

