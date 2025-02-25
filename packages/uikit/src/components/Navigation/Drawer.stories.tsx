import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { ComponentProps } from 'react';
import { Button } from '../Basic/Button';
import { HorizontalRule } from '../Basic/HorizontalRule';

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Drawer>) {
    return (
      <div className='w-full h-48'>
        <Drawer {...args} />
      </div>
    )
  }
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (isOpen, toggle) => <Button className='mx-2 ml-96' onClick={toggle}>{isOpen ? 'Close' : 'Open'} drawer</Button>,
    content: (isOpen, toggle) => (
      <div>
        <b>App name here</b>
        <HorizontalRule/>
        <ul>
          <li>maybe</li>
          <li>some</li>
          <li>list</li>
          <li>with</li>
          <li>stuff</li>
        </ul>
        <HorizontalRule/>
        <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'} drawer</Button>
      </div>
    )
  },
};
