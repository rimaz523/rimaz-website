import { applicationConfig, componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { HeaderComponent } from './header.component'
import { provideRouter } from '@angular/router'
import { routes } from '../../../app.routes'

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
    applicationConfig({
      providers: [provideRouter(routes)],
    }),
  ],
}

export default meta

type Story = StoryObj<HeaderComponent>
export const Default: Story = {}
