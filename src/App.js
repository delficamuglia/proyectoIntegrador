import React from 'react'; 
import {Route, Switch} from "react-router-dom"
import Home from "./Screens/Home/Home"

function App() {
  return (
   <React.Fragment> 
    <Switch> 
    <Route path="/" component={Home} exact /> 
    </Switch>
   </React.Fragment>

  );
}

export default App;
