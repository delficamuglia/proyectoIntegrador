import React from 'react';
import Home from "./Screens/Home/Home"
import Header from "./Components/Header/Header"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />

      </Switch>

    </React.Fragment>

  );
}

export default App;
