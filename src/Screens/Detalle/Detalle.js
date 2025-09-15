import React, { Component } from "react";
import "./styles.css"

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            carga: true, 
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const API_KEY = "cc9626b1c01cc6df9ddb2a9c71454130"; //guardamos id y api key en variables

        // Primero intentamos con película
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                if (data.title) {
                    this.setState({datos: data, carga: false});
                } else {
                    // Si el nombre es name en vez de título, es porq es serie 
                    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
                        .then(res => res.json())
                        .then(data => {
                            this.setState({datos: data, carga: false});
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    } 
    
    render() {
        const datos = this.state.datos;

        return (
            <div className="card">
                {this.state.carga ? (
                    <p className="text"> Cargando... </p>
                ) : (
                    <>
                        <img
                            className="imagen"
                            src={`https://image.tmdb.org/t/p/w500${datos.poster_path}`} 
                            alt={datos.title || datos.name} 
                        />
                        <h4 className="texto">{datos.title || datos.name}</h4>
                        <p className="texto">{datos.overview}</p>
                        {datos.release_date && (
                            <p className="texto">Fecha de estreno: {datos.release_date}</p>
                        )}
                        {datos.first_air_date && (
                            <p className="texto">Primera emisión: {datos.first_air_date}</p>
                        )}
                        {datos.genres && (
                            <p className="texto"> 
                                Géneros: {datos.genres.map(genero => `${genero.name}`)}
                            </p>
                        )}
                        {datos.runtime && (
                            <p className="texto">Duración: {datos.runtime} minutos</p>
                        )}
                        {datos.vote_average && (
                            <p className="texto">Calificación: {datos.vote_average}</p>
                        )}
                        <button className="boton-fav">Agregar a Favoritos </button>
                    </>
                )}
            </div>
        );
    }
}

export default Detalle;
