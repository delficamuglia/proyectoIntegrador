import React, { Component } from "react"

class SeriesCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      busqueda: "", 
      copiaDatos: [], 
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


export default SeriesCards; 