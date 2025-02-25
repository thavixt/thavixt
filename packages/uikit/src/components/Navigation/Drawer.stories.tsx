import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Link } from '../Basic/Link';

const meta = {
  title: 'Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [<Link href='/'>Home</Link>, <Link href='/'>Documentation</Link>, 'Component']
  }
};
