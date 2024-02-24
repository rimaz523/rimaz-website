import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Branding from './Branding'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Branding',
  component: Branding,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
  tags: ['autodocs'],
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    title: 'Rimaz Mohommed',
    subtitle: 'Full Stack Developer • Azure Specialist',
  },
}

export const WithoutSubtitle = {
  args: {
    title: 'Rimaz Mohommed',
    subtitle: '',
  },
}
