import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar, SnackbarHandle } from './Snackbar';
import { useRef } from 'react';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  args: {
    children: 'This is a notification',
    open: true,
    position: 'bottom-left',
    type: 'info',
  },
  render: function StoryComponent(args) {
    const ref = useRef<SnackbarHandle>(null);
    return (
      <div className='flex items-start space-x-2 h-[150px]'>
        <Button onClick={() => { ref.current?.show() }}>Show</Button>
        <Button onClick={() => { ref.current?.hide() }}>Hide</Button>
        <Snackbar {...args} ref={ref} />
      </div>
    )
  },
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
