import { React, useState } from 'react'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'

import { Alert, TextField, Stack, Typography, Button, Fade } from '@mui/material'

const ContactForm = () => {
  const [success, setSuccess] = useState(false)
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })
  const { register, handleSubmit, formState, control, reset } = form
  const { errors } = formState
  const onSubmit = (data) => {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 4000)
    reset()
    console.log(data)
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4' pt={2}>
          Contact me
        </Typography>
        <Stack spacing={4} justifyContent='center' alignItems='center' border={0}>
          <Fade in={success === true} timeout={4000}>
            <Alert severity='success'>Thank you for your message!</Alert>
          </Fade>
          <TextField
            id='name'
            label='Name'
            variant='outlined'
            {...register('name', {
              required: 'Name is required.',
              maxLength: {
                value: 100,
                message: 'Please enter a name with a maximum of 100 characters.',
              },
            })}
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ width: { xs: '100%', md: '80%' } }}
          />
          <TextField
            id='email'
            label='Email'
            variant='outlined'
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Please enter a valid email.',
              },
              maxLength: {
                value: 100,
                message: 'Please enter an email with a maximum of 100 characters.',
              },
            })}
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ width: { xs: '100%', md: '80%' } }}
          />
          <TextField
            id='message'
            label='Message'
            multiline
            rows={10}
            {...register('message', {
              required: 'Message is required.',
              maxLength: {
                value: 500,
                message: 'Please enter a message with a maximum of 500 characters.',
              },
            })}
            required
            error={!!errors.message}
            helperText={errors.message?.message}
            sx={{ width: { xs: '100%', md: '80%' } }}
          />
          <Button variant='contained' type='submit' color='primary'>
            Submit
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default ContactForm
