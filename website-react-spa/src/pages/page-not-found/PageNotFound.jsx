import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@mui/material'

const PageNotFound = ({ content }) => {
  return (
    <Box textAlign='center' pt={{ xs: 25 }} pb={{ xs: 25 }}>
      <h1>{content}</h1>
    </Box>
  )
}

PageNotFound.propTypes = {
  content: PropTypes.string,
}

PageNotFound.defaultProps = {
  content: 'Page not found.',
}

export default PageNotFound
