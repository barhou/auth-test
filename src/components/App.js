import React from "react"
import  Login  from "./login"
import Signup from "../components/signup"
import { BrowserRouter as Router,Route ,Switch,Redirect } from "react-router-dom"
import ModalExampleTopAligned from "./home"

function App() {
  const lo=localStorage.getItem("token")
  return (

  <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <PrivateRoute exact authenticated={lo} path='/home' component={ModalExampleTopAligned} />
      </Switch>
  </Router>
  )
}

function PrivateRoute ({component: Component, authenticated, ...rest}) {
 console.log(authenticated,"authththt")
  return (
    <Route
      {...rest}
      render={(props) => authenticated 
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default App
