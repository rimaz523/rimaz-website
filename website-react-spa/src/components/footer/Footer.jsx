import React from 'react'

import PropTypes from 'prop-types'

import { Box, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'

import Image from 'mui-image'

const Footer = ({ preContent, postContent }) => {
  return (
    <footer>
      <Box pt={{ xs: 2, sm: 5 }} pb={1} borderTop={1}>
        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
          <Typography>
            {preContent}
            {new Date().getFullYear()}
            {postContent}
          </Typography>
          <Image
            src={process.env.REACT_APP_BLOB_STORE_BASE_URL.concat(
              '/app/positivessl_trust_seal.png',
            )}
            width='124px'
            height='32px'
            onClick={() => {
              window.open(
                'https://secure.trust-provider.com/ttb_searcher/trustlogo?v_querytype=W&v_shortname=POSDV&v_search=https://rimaz.dev/&x=6&y=5',
              )
            }}
            style={{ cursor: 'pointer' }}
          />
        </Stack>
      </Box>
    </footer>
  )
}

Footer.propTypes = {
  preContent: PropTypes.string,
  postContent: PropTypes.string,
}

Footer.defaultProps = {
  preContent: 'Copyright © ',
  postContent: ' Rimaz Mohommed',
}

export default Footer
