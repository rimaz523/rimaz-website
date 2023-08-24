import React from 'react'

import { TextField, Stack, Typography, Button } from '@mui/material'

const ContactForm = () => {
  return (
    <form>
      <Typography variant='h4' pt={2} pb={6}>
        Contact me
      </Typography>
      <Stack spacing={4} justifyContent='center' alignItems='center' border={0}>
        <TextField
          id='name'
          label='Name'
          variant='outlined'
          sx={{ width: { xs: '100%', md: '80%' } }}
        />
        <TextField
          id='email'
          label='Email'
          variant='outlined'
          sx={{ width: { xs: '100%', md: '80%' } }}
        />
        <TextField
          id='outlined-multiline-static'
          label='Message'
          multiline
          rows={10}
          sx={{ width: { xs: '100%', md: '80%' } }}
        />
        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default ContactForm
