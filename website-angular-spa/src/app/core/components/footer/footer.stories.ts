import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'

import { FooterComponent } from './footer.component'

const meta: Meta<FooterComponent> = {
  title: 'Core/Footer',
  component: FooterComponent,
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

type Story = StoryObj<FooterComponent>
export const Default: Story = {}
