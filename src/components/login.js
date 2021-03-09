import React,{useState} from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom"
import {auth} from "../firebase"

  const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signUp=()=>{
    auth.signInWithEmailAndPassword(
      email,password)
      .then(res=>{
        console.log(res,"res")
        localStorage.setItem("token","res")
        props.history.push('/home')
      })
      .catch(res=>alert("this user not found"))
  }
  return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user'
          value={email}
          onChange={v=>setEmail(v.target.value)}
          iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            value={password}
            onChange={v=>setPassword(v.target.value)}
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large' onClick={signUp}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to={"/signup"}>Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
  )}

export default withRouter(Login)