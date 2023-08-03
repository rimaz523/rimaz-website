import React from 'react'

import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import BlogPreview from '../blogPreview/BlogPreview'

const BlogList = () => {
  return (
    <Box pt={{ xs: 5 }} pb={{ xs: 5 }}>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6}>
          <BlogPreview />
        </Grid>
        <Grid xs={12} sm={12} md={6}>
          <BlogPreview />
        </Grid>
        <Grid xs={12} sm={12} md={6}>
          <BlogPreview />
        </Grid>
        <Grid xs={12} sm={12} md={6}>
          <BlogPreview />
        </Grid>
      </Grid>
    </Box>
  )
}

export default BlogList
