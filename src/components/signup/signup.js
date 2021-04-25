import React,{useState} from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, withRouter } from "react-router-dom"
//import { useHistory } from "react-router-dom"
import {auth} from "../../firebase" 


  const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSignUp = async ()   => {
if(passwordConfirmation == password){
  const res=  await auth.createUserWithEmailAndPassword(
    email,password
      )
      .then(res=>props.history.push('/'))
      .catch(err=>  alert(JSON.stringify("User already used",err)))
     
}else{
  alert("Password not match")
}

      };  
return(
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         sign-up to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input value={email} onChange={v=>setEmail(v.target.value)} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
         
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={password}
            onChange={v=>setPassword(v.target.value)}
          />
<Form.Input
            fluid
            icon='repeat'
            iconPosition='left'
            placeholder='Password Confirmation'
            type='password'
            value={passwordConfirmation}
            onChange={v=>setPasswordConfirmation(v.target.value)}
          />
          <Button color='teal' fluid size='large' onClick={handleSignUp}>
            Signup
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <Link to={"/"}> Sign in</Link>
      </Message>
    </Grid.Column>
  </Grid>
)}

export default withRouter(Signup)