import Footer from './Footer'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    preContent: 'Copyright © ',
    postContent: ' Rimaz Mohommed',
  },
}
