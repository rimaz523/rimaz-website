import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@mui/material'

const ContactPage = ({ content }) => {
  return (
    <Box textAlign='center' pt={{ xs: 25 }} pb={{ xs: 25 }}>
      <h1>{content}</h1>
    </Box>
  )
}

ContactPage.propTypes = {
  content: PropTypes.string,
}

ContactPage.defaultProps = {
  content: 'Welcome to my contact page!',
}

export default ContactPage
