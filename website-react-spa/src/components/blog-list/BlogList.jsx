import React from 'react'

import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import { useBlogPreviewsQuery } from '../../features/integrations/integrations-api-slice'
import BlogPreview from '../blog-preview/BlogPreview'

const BlogList = () => {
  const { data = [] } = useBlogPreviewsQuery()
  // const blogPreviews = [
  //   {
  //     id: 1,
  //     title: 'React 101 : Creating your starter React app using Yarn Berry (yarn@3.3.1)',
  //     content:
  //       'In this article I’ll be showing you how to set up a starter react app in windows using the create-react-app command, configure your editor — VS Code, and version control the app.',
  //     image: '/blog-preview-url/reactjs-v1.jpg',
  //     url: 'https://rimazmohommed523.medium.com/react-101-creating-your-starter-react-app-using-yarn-berry-yarn-3-3-1-e40ed98ec14',
  //   },
  //   {
  //     id: 2,
  //     title: 'React 102 : Configuring code formatting using Prettier, ESLint & Husky',
  //     content:
  //       'In this article I’ll be diving into setting up pettier, eslint and husky for configuring the code formatting rules for your react js application. I will be using yarn as my package manager.',
  //     image: '/blog-preview-url/reactjs-v2.jpg',
  //     url: 'https://rimazmohommed523.medium.com/react-102-configuring-code-formatting-using-prettier-eslint-husky-f207f1bcebed',
  //   },
  //   {
  //     id: 3,
  //     title: 'JMeter Load Testing : Part 1 — Installing JMeter on Windows',
  //     content:
  //       'I recently had to run some performance load tests against a number of API apps to make sure they can handle the predicted load and identify the point at which performance degraded and the app needed to scale out. JMeter is a pretty impressive tool that can generate a rich set of reports for analysis and is very simple to configure and run if you come from an IT background.',
  //     image: '/blog-preview-url/jmeter-v1.jpg',
  //     url: 'https://rimazmohommed523.medium.com/jmeter-load-testing-part-1-installing-jmeter-on-windows-fa524da15ae0',
  //   },
  //   {
  //     id: 4,
  //     title: 'AZ-303 Azure Architect Technologies : Study Guide',
  //     content:
  //       'I passed my AZ-303 exam in June 2021. The exam consisted of around MCQs and 1 case study. What follows is the study guide I created based on the exam skills outline to help me prepare. Hope this helps you too. Cheers!',
  //     image: '/blog-preview-url/azure-architect-study-guide.jpg',
  //     url: 'https://rimazmohommed523.medium.com/az-303-azure-architect-technologies-study-guide-e0bb6e3e2ee4',
  //   },
  // ]

  return (
    <>
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
    </>
  )
}

export default BlogList
