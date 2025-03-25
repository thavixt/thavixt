import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ClickTarget } from './ClickTarget';
import { Button } from '../Button/Button';
import { ComponentProps, useState } from 'react';

const meta = {
  title: 'Utility/Click target',
  component: ClickTarget,
  tags: ['autodocs'],
  args: {
    onClickOutside: fn(),
    onClickInside: fn(),
    children: <Button variant='primary' data-testid="button">Click outside or inside this button</Button>
  },
  render: function StoryComponent(args: ComponentProps<typeof ClickTarget>) {
    const [info, setInfo] = useState('');
    return (
      <div className='flex flex-col space-y-2'>
        <ClickTarget
          {...args}
          onClickInside={() => {
            setInfo('you last clicked inside the button')
            args.onClickOutside();
          }}
          onClickOutside={() => {
            setInfo('you last clicked outside the button')
            args.onClickInside?.();
          }}
        />
        <div data-testid="lastClick">{info}</div>
      </div>
    )
  },
} satisfies Meta<typeof ClickTarget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
