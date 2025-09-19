import React, { Component } from "react"
import PeliculasCards from "../Peliculas/PeliculasCards";
import SeriesCards from "../Series/SeriesCards"
import { Link } from 'react-router-dom'
import "./styles.css"

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculasFavoritas: [],
            seriesFavoritas: [],
            cargando: true, 
            hayFavoritos: true
        }
    }

    componentDidMount() {
        let listaIdFavoritos = []
        let datosEnLocalStorage = localStorage.getItem("Favoritos")
        if (!datosEnLocalStorage) {
            this.setState({
                cargando: false,
                hayFavoritos: false
            })
        }
        if (datosEnLocalStorage !== null) {
            listaIdFavoritos = JSON.parse(datosEnLocalStorage)
            if (listaIdFavoritos.length === 0) {
                this.setState({cargando: false, hayFavoritos: false })
                return
            }
            let listaPeliculasAux = []
            let listaSeriesAux = []

            listaIdFavoritos.map(unId => {
                fetch(`https://api.themoviedb.org/3/movie/${unId}?api_key=cc9626b1c01cc6df9ddb2a9c71454130`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.title) {
                            listaPeliculasAux.push(data)
                            this.setState({
                                peliculasFavoritas: [...listaPeliculasAux],
                                cargando: false
                            })
                        } else {
                            // Si el nombre es name en vez de title, es porque es serie
                            fetch(`https://api.themoviedb.org/3/tv/${unId}?api_key=cc9626b1c01cc6df9ddb2a9c71454130`)
                                .then(res => res.json())
                                .then(data => {
                                    listaSeriesAux.push(data)
                                    this.setState({
                                        seriesFavoritas: [...listaSeriesAux],
                                        cargando: false
                                    })
                                })
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(error => console.log(error))
            })
        }
    }

    render() {

        return (
            <>
                <h1>Página de favoritos</h1>
                {this.state.cargando ?
                    <p> Cargando... </p>
                    : !this.state.hayFavoritos ?
                        <div className="container">
                            <h2 className="fav titulo"> ¡Elegí tus peliculas y series favoritas! </h2>
                            <div className="links">
                            <Link to="/peliculas" className="boton"> Peliculas </Link>
                            <Link to="/series" className="boton"> Series </Link>
                            </div>
                        </div>
                        : (
                            <>
                                <h2 className="fav">Peliculas Favoritas</h2>
                                <section className="row cards all-movies">
                                    {this.state.peliculasFavoritas.map(pelicula => <PeliculasCards key={pelicula.id} pelicula={pelicula} />)}
                                </section>
                                <h2 className="fav">Series Favoritas</h2> {/*CORREGIR ESTO PORQUE SE GUARDAN TODOS BAJO PELÍCULAS*/}
                                <section className="row cards all-movies">
                                    {this.state.seriesFavoritas.map(serie => <SeriesCards key={serie.id} serie={serie} />)}
                                </section>
                            </>
                        )
                }
            </>
        )
    }
}

export default Favoritos;