import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import Coin from "./pages/Coin"
import Page404 from "./pages/404"

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/coins/:id" component={Coin} />
      <Route component={Page404} />
    </Switch>
  )
}

export default App
