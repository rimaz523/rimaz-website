import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@mui/material'

const AboutPage = ({ content }) => {
  return (
    <Box textAlign='center' pt={{ xs: 25 }} pb={{ xs: 25 }}>
      <h1>{content}</h1>
    </Box>
  )
}

AboutPage.propTypes = {
  content: PropTypes.string,
}

AboutPage.defaultProps = {
  content: 'Welcome to my about page!',
}

export default AboutPage
