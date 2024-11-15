import SocialHandle from './SocialHandle'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/SocialHandle',
  component: SocialHandle,
  tags: ['autodocs'],
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Github = {
  args: {
    name: 'Github',
    url: 'https://github.com/rimaz523',
    isDarkMode: false,
  },
}
export const Medium = {
  args: {
    name: 'Medium',
    url: 'https://rimazmohommed523.medium.com',
    isDarkMode: false,
  },
}
export const Linkedin = {
  args: {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/rimazmohommed',
    isDarkMode: false,
  },
}
export const Stackoverflow = {
  args: {
    name: 'Stackoverflow',
    url: 'https://stackoverflow.com/users/4546132/rimaz-mohommed',
    isDarkMode: false,
  },
}
export const Twitter = {
  args: {
    name: 'Twitter',
    url: 'https://twitter.com/rimaz_mohommed',
    isDarkMode: false,
  },
}
