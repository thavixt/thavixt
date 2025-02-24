import type { Meta, StoryObj } from '@storybook/react';
import { ClickTarget } from './ClickTarget';
import { fn } from '@storybook/test';
import { Button } from '../Button/Button';

const meta = {
  title: 'Utils/Click target',
  component: ClickTarget,
  tags: ['autodocs'],
  args: {
    onClickOutside: fn(),
    onClickInside: fn(),
    children: <Button>Click outside me and check the logs</Button>
  }
} satisfies Meta<typeof ClickTarget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
