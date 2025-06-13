import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { SocialHandleComponent } from './social-handle.component'

const meta: Meta<SocialHandleComponent> = {
  title: 'Components/SocialHandle',
  component: SocialHandleComponent,
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

type Story = StoryObj<SocialHandleComponent>
export const Default: Story = {}
