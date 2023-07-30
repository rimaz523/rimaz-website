import React from 'react'

import PropTypes from 'prop-types'

import { Box, Container } from '@mui/material'

const Footer = ({ preContent, postContent }) => {
  return (
    <footer>
      <Box borderTop={1}>
        <Container>
          <Box textAlign='center' pt={{ xs: 2, sm: 5 }} pb={{ xs: 2, sm: 5 }}>
            {preContent}
            {new Date().getFullYear()}
            {postContent}
          </Box>
        </Container>
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
