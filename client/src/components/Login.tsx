import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Message, Schema, toaster } from 'rsuite'
import { LoginUser } from '../types'

const model = Schema.Model({
  email: Schema.Types.StringType().isRequired().isEmail(),
  password: Schema.Types.StringType().isRequired()
})

interface Props {
  onSubmit: (u: Partial<LoginUser>) => Promise<any>
}

export default function Login(props: Props) {
  const [formValue, setFormValue] = useState<Partial<LoginUser>>({})
  return (
    <div>
      <h2>Login</h2>
      <Form
        fluid
        model={model}
        formValue={formValue}
        checkTrigger='none'
        onChange={setFormValue}
        onSubmit={async (c) => {
          if (!c) {
            return;
          }
          try {
            await props.onSubmit(formValue);
            setFormValue({});
          } catch (error: any) {
            console.log(error);
            toaster.push(
              <Message type='error'>{error?.response.data.error}</Message>
            )
          }
        }}
      >
        <Form.Group controlId='email'>
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name='email' />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control type='password' name='password' />
        </Form.Group>
        <Button className='fluid' type='submit' appearance='primary'>Login</Button>
      </Form>
      <Link to='/register'>
        <Button className='fluid' appearance='link'>Don't have an acount</Button>
      </Link>
    </div>
  )
}
