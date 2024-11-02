import React from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import SvgIcon from '@mui/material/SvgIcon'

import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function SocialHandle({ name, url }) {
  const isDarkMode = useSelector((state) => state.theme.darkmode)
  const SocialHandleIcon = iconsRenderer[name]
  return (
    <IconButton
      sx={{ mx: 1 }}
      onClick={() => {
        window.open(url)
      }}
    >
      {SocialHandleIcon && SocialHandleIcon(isDarkMode)}
    </IconButton>
  )
}

const renderGithubIcon = (isDarkMode) => {
  return (
    <GitHubIcon
      fontSize='large'
      sx={{
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    />
  )
}

const renderMediumIcon = (isDarkMode) => {
  return (
    <SvgIcon
      fontSize='large'
      sx={{
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='96px' height='96px'>
        <circle cx='14' cy='24' r='12' fill={isDarkMode ? '#ffffff' : '#000000'} />
        <ellipse cx='34' cy='24' fill={isDarkMode ? '#ffffff' : '#000000'} rx='6' ry='11' />
        <ellipse cx='44' cy='24' fill={isDarkMode ? '#ffffff' : '#000000'} rx='2' ry='10' />
      </svg>
    </SvgIcon>
  )
}

const renderLinkedinIcon = (isDarkMode) => {
  return (
    <LinkedInIcon
      fontSize='large'
      sx={{
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
        color: isDarkMode ? '#ffffff' : '#000000',
      }}
    />
  )
}

const renderStackoverflowIcon = (isDarkMode) => {
  return (
    <SvgIcon
      fontSize='large'
      sx={{
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 50 50'
        width='100px'
        height='100px'
        fillRule='evenodd'
      >
        <g fill={isDarkMode ? '#ffffff' : '#000000'}>
          <path
            fillRule='evenodd'
            d='M 40.925781 1.890625 L 37.859375 2.417969 L 41.1875 20.625 L 44.03125 20.253906 Z M 29.96875 6.351563 L 27.101563 8.078125 L 37.300781 23.035156 L 39.820313 21.480469 Z M 20.796875 15.03125 L 19.113281 17.703125 L 34.5 27 L 35.902344 24.578125 Z M 16.375 24.402344 L 15.628906 27.402344 L 33.359375 31.894531 L 33.640625 29.203125 Z M 9 29 L 9 47.984375 L 38.902344 48 L 38.902344 47.984375 C 38.933594 47.984375 39 29 39 29 L 36 29 L 36 45 L 12 45 L 12 29 Z M 15.152344 32.355469 L 14.902344 35.339844 L 33 37 L 33.203125 34.5 Z M 14.902344 39 L 15 42 L 33 41.929688 L 33 39 Z'
          />
        </g>
      </svg>
    </SvgIcon>
  )
}

const renderTwitterIcon = (isDarkMode) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 30 30'
      width='35px'
      height='35px'
      fillRule='evenodd'
    >
      <g fill={isDarkMode ? '#ffffff' : '#000000'}>
        <path d='M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z' />
      </g>
    </svg>
  )
}

const iconsRenderer = {
  Github: renderGithubIcon,
  Medium: renderMediumIcon,
  Linkedin: renderLinkedinIcon,
  Stackoverflow: renderStackoverflowIcon,
  Twitter: renderTwitterIcon,
}

SocialHandle.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
}
