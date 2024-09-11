import React from 'react'
import { useParams } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Box, Typography, Card, CardContent } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import Image from 'mui-image'

import { useArticleQuery } from '../../features/integrations/integrations-api-slice'

const ArticlePage = ({ content }) => {
  const { slug } = useParams()
  const { data = {}, isFetching } = useArticleQuery({ slug })

  return isFetching ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <Box key={slug} textAlign='left' pt={{ xs: 15 }}>
      <Typography textAlign='center' variant='h6' sx={{ fontWeight: 'bold' }}>
        {data.title}
      </Typography>
      <Card
        variant='outlined'
        sx={{ mx: { xs: 2, md: 10 }, my: 4, borderRadius: '10px', height: '100%' }}
      >
        <CardContent>
          {data.sections.map(function (section) {
            return (
              <div key={section.id}>
                {section.type === 'segment' &&
                  section.contents.map(function (segment) {
                    return <p key={segment}>{segment}</p>
                  })}
                {section.type === 'code' &&
                  section.contents.map(function (code) {
                    return (
                      <p key={code} style={{ backgroundColor: '#d3d3d3' }}>
                        {code}
                      </p>
                    )
                  })}
                {section.type === 'image' && (
                  <Image
                    src={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat(
                      '/',
                      data.slug,
                      '/',
                      section.contents,
                    )}
                    showLoading
                    style={{ width: '60%' }}
                  />
                  // for mobile image, do 100%
                )}
                {section.type === 'heading' && (
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {section.contents}
                  </Typography>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </Box>
  )
}

ArticlePage.propTypes = {
  content: PropTypes.string,
}

ArticlePage.defaultProps = {
  content: 'Deploying your docker image to Minikube',
}

export default ArticlePage
