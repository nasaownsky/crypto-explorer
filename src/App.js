import React from "react"
import { Route, Switch } from "react-router-dom"

import { Home, Coin, Page404 } from "./pages"

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
