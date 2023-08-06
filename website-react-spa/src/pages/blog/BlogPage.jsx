import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@mui/material'

import BlogList from '../../components/blog-list/BlogList'

const BlogPage = ({ content }) => {
  return (
    <>
      <Box textAlign='center' pt={{ xs: 2 }} pb={{ xs: 2 }}>
        <h1>{content}</h1>
      </Box>

      <BlogList />
    </>
  )
}

BlogPage.propTypes = {
  content: PropTypes.string,
}

BlogPage.defaultProps = {
  content: 'Welcome to my blogs!',
}

export default BlogPage
