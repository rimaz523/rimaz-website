import React from 'react'

import PropTypes from 'prop-types'

import { Box, Typography, Card, CardContent } from '@mui/material'

import ContactForm from '../../components/forms/ContactForm'

const ContactPage = ({ content }) => {
  return (
    <Box textAlign='center' pt={{ xs: 4 }}>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        {content}
      </Typography>
      <Card
        variant='outlined'
        sx={{ mx: { xs: 2, md: 10 }, my: 4, borderRadius: '10px', height: '100%' }}
      >
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </Box>
  )
}

ContactPage.propTypes = {
  content: PropTypes.string,
}

ContactPage.defaultProps = {
  content: 'Get in touch if you have any questions',
}

export default ContactPage
