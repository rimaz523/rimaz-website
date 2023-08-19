import React from 'react'

import { Typography, Box } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import WorkIcon from '@mui/icons-material/Work'

const AboutPage = () => {
  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ height: '100%' }}
        pt={4}
        pb={10}
        pl={{ xs: 0, md: 4 }}
      >
        <Avatar
          alt='Rimaz Mohommed'
          src={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat('/about/profile.jpg')}
          sx={{ width: 300, height: 300 }}
          component={Paper}
          elevation={4}
        />
        <Stack direction='column' sx={{ height: '100%' }} justifyContent='center' spacing={2}>
          <Typography variant='h4' px={{ xs: 2, md: 10 }} pt={{ xs: 2, md: 0 }}>
            Hi, I&apos;m Rimaz
          </Typography>
          <Typography
            variant='h6'
            px={{ xs: 2, md: 10 }}
            pt={{ xs: 4 }}
            sx={{ fontWeight: 'bold' }}
          >
            I specialize as a full-stack developer creating & deploying web and mobile apps using
            .NET, React, Vue, Flutter, Terraform, Azure Cloud technologies & Azure Devops.
          </Typography>
          <Typography
            variant='h6'
            px={{ xs: 2, md: 10 }}
            pt={{ xs: 2 }}
            sx={{ fontWeight: 'bold' }}
          >
            Outside of work, I enjoy working out at the gym, reading novels, Netflix, and improving
            my acoustic guitar skills.
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4' px={{ xs: 2, md: 2 }} py={{ xs: 4 }}>
          Experience
        </Typography>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <WorkIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                Statistics New Zealand
              </Typography>
              <Typography px={2} variant='overline' component={'div'}>
                Oct 2022 - Present
              </Typography>
            </Stack>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Developed a comprehensive integration solution utilizing .NET 6.0 with Azure functions
              featuring HTTP and Queue triggers to efficiently handle and process large data
              payloads, and a .NET framework 4.8 Web API, both designed using clean architecture
              pattern, to manage Blaise survey operations & 3rd party integrations. DevOps pipelines
              were implemented to automate the building and deployment of the web API & function
              apps. Infrastructure as code was also incorporated using Terraform to manage the
              function apps, Web APIs, Queue/Table Storage, and Azure APIMs.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <WorkIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                Intergen
              </Typography>
              <Typography px={2} variant='overline' component={'div'}>
                Jan 2019 - Oct 2022
              </Typography>
            </Stack>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Although my official title was Full-Stack Developer, my role involved a blend of
              DevOps and Dev functions, including setting up infrastructure and deployment
              pipelines. I seamlessly integrated development and operations workflows to optimize
              the end-to-end software development lifecycle.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <WorkIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                OrangeHRM
              </Typography>
              <Typography px={2} variant='overline' component={'div'}>
                Feb 2014 - Jan 2019
              </Typography>
            </Stack>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Spearheaded the implementation & design to make the product GDPR compliant for our
              European clients. Integrated the Time module with Toggl to provide a seamless user
              experience for our clients who use Toggl for time tracking. Improved product security
              emphatically against numerous vulnerabilities. Standardized the development process
              for Open Source. Senior Software Engineer in the Customizations Department.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default AboutPage
