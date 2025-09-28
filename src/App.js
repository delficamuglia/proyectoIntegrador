import React from 'react';
import Home from "./Screens/Home/Home"
import Peliculas from "./Screens/Peliculas/Peliculas"
import Series from "./Screens/Series/Series"
import Detalle from "./Screens/Detalle/Detalle"
import NotFound from "./Screens/NotFound/NotFound"
import Header from "./Components/Header/Header"
import ResultadosBusqueda from "./Screens/ResultadosBusqueda/ResultadosBusqueda"
import Footer from "./Components/Footer/Footer"
import Favoritos from './Screens/Favoritos/Favoritos';

import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/peliculas" component={Peliculas}  />
        <Route path="/series" component={Series}  />
        <Route path="/detalle/:tipo/:id" component={Detalle} />
        <Route path="/busqueda/:tipo/:query" component={ResultadosBusqueda}/>
        <Route path="/favoritos" component={Favoritos}/>  
        <Route component={NotFound} />
      </Switch>
      <Footer />

    </React.Fragment>

  );
}

export default App;
