import React from 'react';
import Home from "./screens/Home/Home"
import Peliculas from "./screens/Peliculas/Peliculas"
import Series from "./screens/Series/Series"
import Detalle from "./screens/Detalle/Detalle"
import NotFound from "./screens/NotFound/NotFound"
import Header from "./Components/Header/Header"
import ResultadosBusqueda from "./screens/ResultadosBusqueda/ResultadosBusqueda"
import Footer from "./Components/Footer/Footer"
import Favoritos from './screens/Favoritos/Favoritos';

import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/peliculas" component={Peliculas}  />
        <Route path="/series" component={Series}  />
        <Route path="/detalle/id/:id" component={Detalle} />
        <Route path="/busqueda/:query" component={ResultadosBusqueda}/>
        <Route path="/favoritos" component={Favoritos}/>  
        <Route component={NotFound} />
      </Switch>
      <Footer />

    </React.Fragment>

  );
}

export default App;
