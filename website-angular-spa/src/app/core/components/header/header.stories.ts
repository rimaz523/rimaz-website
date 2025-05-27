import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { HeaderComponent } from './header.component'

const meta: Meta<HeaderComponent> = {
  title: 'Core/Header',
  component: HeaderComponent,
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

type Story = StoryObj<HeaderComponent>
export const Default: Story = {}
