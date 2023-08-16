import React from 'react'

import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Unstable_Grid2'

import { useBlogPreviewsQuery } from '../../features/integrations/integrations-api-slice'
import BlogPreview from '../blog-preview/BlogPreview'

const BlogList = () => {
  const { data = [], isFetching } = useBlogPreviewsQuery()

  return isFetching ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <Box pt={{ xs: 5 }} pb={{ xs: 5 }}>
      <Grid container rowSpacing={{ xs: 2, sm: 3, md: 4 }} columnSpacing={0}>
        {data.map((blogPreview) => {
          return (
            <Grid xs={12} sm={12} md={3} key={blogPreview.id}>
              <BlogPreview {...blogPreview} sx={{ height: '100%' }} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default BlogList
