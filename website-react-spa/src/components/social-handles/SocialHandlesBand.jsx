import React from 'react'
import { useSelector } from 'react-redux'

import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { useSocialHandlesQuery } from '../../features/integrations/integrations-api-slice'
import SocialHandle from './SocialHandle'

export default function SocialHandlesBand() {
  const { data = [], isFetching } = useSocialHandlesQuery()
  const isDarkMode = useSelector((state) => state.theme.darkmode)
  return isFetching ? (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  ) : (
    <Box
      sx={{
        flexGrow: 1,
        pt: 2,
        pb: 2,
        justifyContent: 'space-between',
      }}
    >
      <Container sx={{ textAlign: 'center', justifyContent: 'space-between' }}>
        {data.map((socialHandle) => {
          return <SocialHandle {...socialHandle} isDarkMode={isDarkMode} key={socialHandle.name} />
        })}
      </Container>
    </Box>
  )
}
