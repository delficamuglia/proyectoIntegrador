import React, { Component } from "react"
import PeliculasCards from "../Peliculas/PeliculasCards";
import SeriesCards from "../Series/SeriesCards";

class Favoritos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculasFavoritas: [],
            seriesFavoritas: [],
            carga: true,
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
                this.setState({ cargando: false, hayFavoritos: false })
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
                                peliculasFavoritas: [...listaPeliculasAux]
                            })
                        } else {
                            // Si el nombre es name en vez de title, es porque es serie
                            fetch(`https://api.themoviedb.org/3/tv/${unId}?api_key=cc9626b1c01cc6df9ddb2a9c71454130`)
                                .then(res => res.json())
                                .then(data => {
                                    listaSeriesAux.push(data)
                                    this.setState({
                                        seriesFavoritas: [...listaSeriesAux]
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
                    <p>Cargando...</p>
                    : !this.state.hayFavoritos ?
                        <h2> No hay Favoritos </h2>
                        : (
                            <>
                                <h3 className="fav">Peliculas Favoritas</h3>
                                <section className="row cards all-movies">
                                    {this.state.peliculasFavoritas.map(pelicula => <PeliculasCards key={pelicula.id} pelicula={pelicula} />)}
                                </section>
                                <h3 className="fav">Series Favoritas</h3> {/*CORREGIR ESTO PORQUE SE GUARDAN TODOS BAJO PELÍCULAS*/}
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