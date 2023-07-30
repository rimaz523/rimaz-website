import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@mui/material'

const BlogPage = ({ content }) => {
  return (
    <Box textAlign='center' pt={{ xs: 25 }} pb={{ xs: 25 }}>
      <h1>{content}</h1>
    </Box>
  )
}

BlogPage.propTypes = {
  content: PropTypes.string,
}

BlogPage.defaultProps = {
  content: 'Welcome to my blogs!',
}

export default BlogPage
