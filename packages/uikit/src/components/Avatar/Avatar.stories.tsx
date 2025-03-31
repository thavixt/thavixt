import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { fn } from '@storybook/test';

const meta = {
  title: 'Basic/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    name: 'John Doe',
    size: 'md',
    src: 'https://pc.net/img/terms/avatar.svg',
    // status: 'online',
    onClick: fn(),
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
