import React from 'react'
import { useSelector } from 'react-redux'

import { Typography, Box, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'

import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import CodeIcon from '@mui/icons-material/Code'
import WorkIcon from '@mui/icons-material/Work'

const AboutPage = () => {
  const isDarkMode = useSelector((state) => state.theme.darkmode)

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems='center'
        spacing={2}
        sx={{
          backgroundImage: `url(${process.env.REACT_APP_BLOB_STORE_BASE_URL.concat(
            '/app/coding3-backdrop.jpg',
          )})`,
          height: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        pt={15}
        pb={10}
        pl={{ xs: 0, md: 4 }}
      >
        <Avatar
          alt='Rimaz Mohommed'
          src={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat('/about/profile.jpg')}
          sx={{ width: 300, height: 300, border: 4, borderColor: isDarkMode ? '#000' : '#fff' }}
        />
        <Stack direction='column' sx={{ height: '100%' }} spacing={2} alignItems={'center'}>
          <Typography
            variant='h6'
            px={{ xs: 2, md: 10 }}
            pt={{ xs: 0 }}
            sx={{ fontWeight: 'bold' }}
            color='#fff'
            textAlign={'center'}
          >
            I specialize as a full-stack developer creating & deploying web and mobile apps using
            .NET, React, Vue, Flutter, Terraform, Azure Cloud technologies & Azure Devops.
          </Typography>
          <Typography
            variant='h6'
            px={{ xs: 2, md: 10 }}
            pt={{ xs: 0 }}
            sx={{ fontWeight: 'bold' }}
            color='#fff'
            textAlign={'center'}
          >
            Outside of work, I enjoy working out at the gym, reading novels, Netflix, and improving
            my acoustic guitar skills.
          </Typography>
          <Button
            startIcon={<CloudDownloadIcon />}
            variant='contained'
            style={{ width: '300px' }}
            onClick={() => {
              window.open(process.env.REACT_APP_RESUME_DOWNLOAD_URL)
            }}
          >
            Download Resume
          </Button>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4' px={{ xs: 2, md: 2 }} py={{ xs: 4 }} textAlign='center'>
          Projects / Open Source
        </Typography>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <CodeIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                Clean Lean Architecture Solution Template
              </Typography>
            </Stack>
            <Typography variant='overline' component={'div'}>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/rimaz523/Clean.Lean.Architecture.WebApi.AspNetCore.Solution.Template'
              >
                View on github
              </a>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Implemented a .NET Core template to expedite the process of swiftly establishing a
              .NET Core Web API project that adheres to clean architecture principles. This template
              includes features like Mediatr pipeline for logging, error handling, FluentValidation
              for api inputs, API integration with a 3rd party using HttpClient & Polly for retries,
              Efcore Sql Server implementation with localdb, and an .editorconfig file for
              consistent code styles. You can install this package from{' '}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.nuget.org/packages/Clean.Lean.Architecture.WebApi.AspNetCore.Solution.Template/'
              >
                nuget.org
              </a>
              .
            </Typography>
          </CardContent>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <CodeIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                Blog Website
              </Typography>
            </Stack>
            <Typography variant='overline' component={'div'}>
              <a target='_blank' rel='noreferrer' href='https://github.com/rimaz523/rimaz-website'>
                View on github
              </a>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              My public developer blog website repository, which is a monorepo housing various
              components: a frontend ReactJS single-page application (SPA), a web API backend
              developed with dotnet core and the clean architecture pattern, and infrastructure as
              code (IAC) using Terraform for site setup. The website is accessible at{' '}
              <a target='_blank' rel='noreferrer' href='https://rimaz.dev'>
                rimaz.dev
              </a>
              .
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h4' px={{ xs: 2, md: 2 }} py={{ xs: 4 }} textAlign='center'>
          Professional Experience
        </Typography>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <WorkIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                Nib
              </Typography>
            </Stack>
            <Typography variant='overline' component={'div'}>
              Apr 2024 - Present
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Senior developer in the orbit platform working with .NET framework, Angular,
              terraform, Azure and related Microsoft technologies
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Stack direction='row' alignItems='center'>
              <WorkIcon />
              <Typography px={2} variant='subtitle1' component={'div'} sx={{ fontWeight: 'bold' }}>
                Statistics New Zealand
              </Typography>
            </Stack>
            <Typography variant='overline' component={'div'}>
              Oct 2022 - Apr 2024
            </Typography>
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
            </Stack>
            <Typography variant='overline' component={'div'}>
              Jan 2019 - Oct 2022
            </Typography>
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
            </Stack>
            <Typography variant='overline' component={'div'}>
              Feb 2014 - Jan 2019
            </Typography>
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
