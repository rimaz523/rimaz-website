import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'

import { HeroComponent } from './hero.component'

const meta: Meta<HeroComponent> = {
  title: 'Components/Hero',
  component: HeroComponent,
  tags: ['autodocs'],
  args: {},
  decorators: [
    componentWrapperDecorator(
      story =>
        `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />${story}`,
    ),
  ],
}

export default meta

type Story = StoryObj<HeroComponent>
export const Default: Story = {}
