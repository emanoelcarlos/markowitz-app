import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/home";

function App() {
   return (
      <>
         <HashRouter>
            <Switch>
               <Route exact={true} path="/" component={Home} />
            </Switch>
         </HashRouter>
      </>
   );
}

export default App;
