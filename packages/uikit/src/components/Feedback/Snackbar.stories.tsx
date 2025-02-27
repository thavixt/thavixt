import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { useState } from 'react';
import { Button } from '../Basic/Button';

const meta = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  args: {
    children: 'This is a notification',
    open: true,
    position: 'bottom-left',
    type: 'info',
  }
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function StoryComponent(args) {
    return (
      <div className='flex space-x-2 h-[150px]'>
        <Snackbar {...args} />
      </div>
    )
  },
};

export const Usage: Story = {
  render: function StoryComponent(args) {
    const [open, setOpen] = useState(false);
    return (
      <div className='flex items-start space-x-2 h-[150px]'>
        <Button onClick={() => setOpen(true)}>Show</Button>
        <Button onClick={() => setOpen(false)}>Hide</Button>
        <Snackbar {...args} open={open} />
      </div>
    )
  },
};
