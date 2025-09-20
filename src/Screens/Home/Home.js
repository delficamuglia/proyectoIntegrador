import React, {Component} from "react";
import PeliculasCards from "../Peliculas/PeliculasCards";
import SeriesCards from "../Series/SeriesCards";
import { Link } from "react-router-dom";
// ver boton detalle


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            peliculasDescubrir: [],
            peliculasCargando: true,
            seriesDescubrir: [],
            seriesCargando: true,
        }
      }    

    componentDidMount() {
    
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1")
          .then(response => response.json())
          .then(data => this.setState({
            peliculasDescubrir: data.results,
            peliculasCargando: false,
          }))
          .catch(error => console.log(error));

          fetch("https://api.themoviedb.org/3/discover/tv?api_key=cc9626b1c01cc6df9ddb2a9c71454130&language=es-ES&page=1")
          .then(response => response.json())
          .then(data => this.setState({
            seriesDescubrir: data.results,
            seriesCargando: false,
          }))
          .catch(error => console.log(error));
      }



    render () {
        return (
         
                <>
                 <h2 className="alert alert-primary">Descubrir películas</h2>
                 <Link to='/peliculas'> Ver todas </Link>
                 <section className="row cards all-movies" id="movies">
            { 
            this.state.peliculasCargando ? ( 
              <h3> Cargando... </h3> //mostramos mensaje
            ) :
               (
                this.state.peliculasDescubrir.map((pelicula, idx) => ( //si que el length de los resultados es 0 es falso, y que la app esta cargando es falso entonces mapeamos los resultados y los mostramos 
                 idx<4 ? <PeliculasCards key={pelicula.id} pelicula={pelicula} /> : null
                ))
              )
            }
        </section>

        <h2 className="alert alert-primary">Descubrir  series</h2>
        <Link to='/series'> Ver todas </Link>
                 <section className="row cards all-movies" id="movies">
            {
              this.state.seriesCargando ? (
                <h3> Cargando... </h3>
              ) : (
                this.state.seriesDescubrir.map((serie, idx) => ( //si que el length de los resultados es 0 es falso, y que la app esta cargando es falso entonces mapeamos los resultados y los mostramos 
                 idx<4 ? <SeriesCards key={serie.id} serie={serie} /> : null 
                ))
              )
            }
        </section>
        </>
            
        )
    }
}

export default Home