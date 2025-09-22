import React, { Component } from "react"
import PeliculasCards from "../Peliculas/PeliculasCards";
import SeriesCards from "../Series/SeriesCards"
import { Link } from 'react-router-dom'
import "./styles.css"

let apiKey = "cc9626b1c01cc6df9ddb2a9c71454130"
class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cargandoPeliculas: 0,
            cargandoSeries: 0,
            peliculasFav: [],
            seriesFav: [],
            peliculasIds: [],
            seriesIds: []
        }
    }

    componentDidMount() {
        let peliculasIds = JSON.parse(localStorage.getItem('PeliculasFavoritas')|| "[]") 
        peliculasIds = peliculasIds.filter(id => id); // elimina null, undefined o ""   

            peliculasIds.map(id => {
                return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        let peliculasFav = this.state.peliculasFav
                        peliculasFav.push(data);
                        this.setState({ peliculasFav: peliculasFav, cargandoPeliculas: this.state.cargandoPeliculas + 1});
                        }
                    )
                    .catch(err => console.log(err));
            });
        let seriesIds = JSON.parse(localStorage.getItem('SeriesFavoritas')|| "[]")    
        seriesIds = seriesIds.filter(id => id); // elimina null, undefined o ""   

            seriesIds.map(id => {
                 return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        let seriesFav = this.state.seriesFav
                        seriesFav.push(data);
                        this.setState({ seriesFav: seriesFav, cargandoSeries: this.state.cargandoSeries + 1});
                        }
                    )
                    .catch(err => console.log(err));
            }); 
        this.setState ({
            peliculasIds: peliculasIds,
            seriesIds: seriesIds
        })
    }

    filtrarPeliculas (id) {
        let filtradosPeliculas = this.state.peliculasFav.filter(pelicula => pelicula.id !== id)
        this.setState({
            peliculasFav: filtradosPeliculas
        })
    }

    filtrarSeries (id) {
        let filtradosSeries = this.state.seriesFav.filter(serie => serie.id !== id)
        this.setState({
            seriesFav: filtradosSeries
        })
    }

    render() {
        return (
            <>
                <h1>Favoritos</h1>
                <h2 className="fav">Peliculas Favoritas</h2>
                {this.state.peliculasIds.length === 0
                    ? <div className="container">
                        <h2 className="fav titulo">¡Elegí tus peliculas favoritas!</h2>
                        <div className="links">
                            <Link to="/peliculas" className="boton">Peliculas</Link>
                        </div>
                    </div>
                    : this.state.cargandoPeliculas !== this.state.peliculasIds.length
                        ? <p>Cargando...</p>
                        : <section className="row cards all-movies">
                            {this.state.peliculasFav.map(pelicula => (
                                <PeliculasCards key={pelicula.id} pelicula={pelicula} filtrarPeliculas ={(unId)=> this.filtrarPeliculas(unId)}/>
                            ))}
                        </section>}
                <h2 className="fav">Series Favoritas</h2>
                {this.state.seriesIds.length === 0
                    ? <div className="container">
                        <h2 className="fav titulo">¡Elegí tus series favoritas!</h2>
                        <div className="links">
                            <Link to="/series" className="boton">Series</Link>
                        </div>
                    </div>
                    : this.state.cargandoSeries !== this.state.seriesIds.length
                        ? <p>Cargando...</p>
                        : <section className="row cards all-movies">
                            {this.state.seriesFav.map(serie => (
                                <SeriesCards key={serie.id} serie={serie} filtrarSeries ={(unId) => this.filtrarSeries(unId)}/>
                            ))}
                        </section>}
            </>
    
        )
    }

}

export default Favoritos;