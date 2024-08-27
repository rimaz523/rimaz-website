import React from 'react'
import { useParams } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Box, Typography, Card, CardContent } from '@mui/material'

import Image from 'mui-image'

// how to handle anchor tags?
// how to escape special chars
// how to show code as snippet

const ArticlePage = ({ content }) => {
  const { slug } = useParams()
  const data = {
    title: 'Deploying your docker image to Minikube',
    slug: 'deploying-your-docker-image-to-minikube',
    sections: [
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment', // image, code, segment, heading
        contents: [
          'In this tutorial I will be showing you how you can quickly set up minikube on your local windows machine, and then deploy a docker image successfully in it.',
          'This tutorial continues from my previous post Containerize a .NET Core Web Api App with Docker.',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'heading',
        contents: ['Enabling Hyper-V'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'Before you install Minikube, ensure Hyper-v is enabled on your windows machine.',
          'You can verify this by clicking on the start menu and searching for `Turn Windows features on or off`.',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'image',
        contents: ['1.png'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'If you are using windows Home edition, this Hyper-V feature will not be available for you in the list.',
          'If that is the case then create a new .bat file with the following content :',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [
          JSON.stringify('pushd "%~dp0"'),
          JSON.stringify('dir /b %SystemRoot%servicingPackages*Hyper-V*.mum >hyper-v.txt'),
          JSON.stringify(
            'for /f %%i in (\'findstr /i . hyper-v.txt 2^>nul\') do dism /online /norestart /add-package:"%SystemRoot%\\servicing\\Packages\\%%i"',
          ),
          JSON.stringify('del hyper-v.txt'),
          JSON.stringify(
            'Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL',
          ),
          JSON.stringify('pause'),
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'Save the .bat script, then right-click and Run as Administrator.',
          'Once the script completes execution, you might have to restart your PC, after which you will see the Hyper-v option available under the Turn Windows features on or off screen.',
          'Issue on github : https://github.com/MicrosoftDocs/Virtualization-Documentation/issues/915',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'heading',
        contents: ['Installing Minikube'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'To install minikube you can follow the installation steps in https://minikube.sigs.k8s.io/docs/start/',
          'In my case I’ve used the chocolatey command :',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [JSON.stringify('choco install minikube')],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'Once the installation is complete, you can run the following command to start minikube',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [JSON.stringify('minikube start')],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'image',
        contents: ['2.png'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'NOTE : Kubectl should already be installed on your windows machine, if you had enabled Kubernetes in docker desktop. Otherwise install Kubectl https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'heading',
        contents: ['Deploying our Docker image'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'We will be using the docker image we created in our pervious tutorial to minikube.',
          'Lets first create a simple deployment.yml file and save it.',
          'If you are new to kubernetes and need to understand the contents of this deployment.yml file, then check out the following link for the detailed explaination: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'image',
        contents: ['3.png'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: ['Lets now apply this deployment using kubectl'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [JSON.stringify('kubectl apply -f ./deployment.yml')],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'image',
        contents: ['4.png'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'We can now see our deployment, replicasets and pods using the commands above.',
          'To expose our service run the following command :',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [
          JSON.stringify(
            'kubectl expose deployment webapi-deployment --name=webapi --type=LoadBalancer --target-port=8080',
          ),
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: ['To get the exposed service url run :'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [JSON.stringify('minikube service webapi --url')],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'image',
        contents: ['5.png'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'You can now access your webapi running in minikube by going to the URL http://127.0.0.1:59267/swagger/index.html',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'image',
        contents: ['6.png'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: [
          'Congratulations, you now have a web api running on minikube!',
          'To tear down your deployment and service run:',
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [
          JSON.stringify('kubectl delete deployment webapi-deployment'),
          JSON.stringify('kubectl delete service webapi'),
        ],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: ['To stop minikube :'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [JSON.stringify('minikube stop')],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'segment',
        contents: ['To delete your local minikube cluster :'],
      },
      {
        id: '254c64e5-2585-4034-a93f-5858229d2e84',
        type: 'code',
        contents: [JSON.stringify('minikube delete')],
      },
    ],
  }

  return (
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
                        {JSON.parse(code)}
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
