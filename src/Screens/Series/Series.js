import React, { Component } from "react"
import SeriesCards from "./SeriesCards"


class Series extends Component {
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

  render() {
    return (
      <h2>Series</h2>
    );
  }
}


export default Series; 