import React from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Box, Button } from '@mui/material'

const PageNotFound = ({ content }) => {
  const navigate = useNavigate()

  return (
    <Box textAlign='center' pt={{ xs: 25 }} pb={{ xs: 25 }}>
      <h1>{content}</h1>
      <Button variant='contained' onClick={() => navigate('/')}>
        Back to home
      </Button>
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
