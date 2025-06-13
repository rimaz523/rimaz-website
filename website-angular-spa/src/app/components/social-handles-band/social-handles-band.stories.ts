import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { SocialHandlesBandComponent } from './social-handles-band.component'

const meta: Meta<SocialHandlesBandComponent> = {
  title: 'Components/SocialHandlesBand',
  component: SocialHandlesBandComponent,
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

type Story = StoryObj<SocialHandlesBandComponent>
export const Default: Story = {}
