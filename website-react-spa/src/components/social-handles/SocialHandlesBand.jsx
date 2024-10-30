import React from 'react'

import { Container } from '@mui/material'
import Box from '@mui/material/Box'

import SocialHandle from './SocialHandle'

export default function SocialHandlesBand() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 2,
        pb: 2,
        justifyContent: 'space-between',
      }}
    >
      <Container sx={{ textAlign: 'center', justifyContent: 'space-between' }}>
        <SocialHandle social='GITHUB' url='https://github.com/rimaz523' />
        <SocialHandle social='MEDIUM' url='https://rimazmohommed523.medium.com' />
        <SocialHandle social='LINKEDIN' url='https://www.linkedin.com/in/rimazmohommed' />
        <SocialHandle
          social='STACKOVERFLOW'
          url='https://stackoverflow.com/users/4546132/rimaz-mohommed'
        />
        <SocialHandle social='TWITTER' url='https://twitter.com/rimaz_mohommed' />
      </Container>
    </Box>
  )
}
