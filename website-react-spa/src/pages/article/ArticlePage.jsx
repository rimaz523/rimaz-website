import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { Box, Typography, Card, CardContent } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'

import Image from 'mui-image'

import { useGetArticleBySlugQuery } from '../../features/integrations/integrations-api-slice'

const ArticlePage = () => {
  const { slug } = useParams()
  const { data = {}, isFetching, isError, isSuccess } = useGetArticleBySlugQuery({ slug })
  const isDarkMode = useSelector((state) => state.theme.darkmode)
  const navigate = useNavigate()

  if (isError) {
    navigate('/page-not-found')
  }

  return isFetching ? (
    <Box my={{ xs: 20, sm: 20, md: 30 }}>
      <LinearProgress />
    </Box>
  ) : (
    <Box key={slug} textAlign='left' pt={{ xs: 15 }}>
      {isSuccess && (
        <>
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
                  <Stack
                    direction='column'
                    key={section.id}
                    spacing={section.type === 'code' ? 0 : 1}
                    style={
                      section.type === 'code'
                        ? {
                            'border-radius': '10px',
                            padding: '10px',
                          }
                        : {}
                    }
                    backgroundColor={
                      section.type === 'code' ? (isDarkMode ? '#3a3b3c' : '#d3d3d3') : ''
                    }
                    mt={2}
                    px={2}
                    width={section.type === 'image' ? { xs: '100%', md: '60%' } : {}}
                  >
                    {section.type === 'segment' &&
                      section.contents.map(function (segment) {
                        return <Typography key={segment}>{segment}</Typography>
                      })}
                    {section.type === 'code' &&
                      section.contents.map(function (code) {
                        return (
                          <Typography
                            pl={2}
                            key={code}
                            backgroundColor={isDarkMode ? '#3a3b3c' : '#d3d3d3'}
                          >
                            {code}
                          </Typography>
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
                        style={{ 'border-radius': '5px' }}
                        showLoading
                      />
                      // for mobile image, do 100%
                    )}
                    {section.type === 'heading' && (
                      <Typography variant='h6' pt={2} sx={{ fontWeight: 'bold' }}>
                        {section.contents}
                      </Typography>
                    )}
                  </Stack>
                )
              })}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  )
}

export default ArticlePage
