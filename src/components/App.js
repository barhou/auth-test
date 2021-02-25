import React from "react"
import  Login  from "./login"
import Signup from "../components/signup"
import { BrowserRouter as Router,Route ,Switch } from "react-router-dom"
import ModalExampleTopAligned from "./home"

function App() {
  return (

  <Router>
      <Switch>
        
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <ModalExampleTopAligned />
        </Route>
      </Switch>
  </Router>
  )
}

export default App
