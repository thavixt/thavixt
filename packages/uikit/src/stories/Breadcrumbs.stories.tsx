import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../components/Link';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [<Link href='/'>Home</Link>, <Link href='/'>Documentation</Link>, 'Component']
  }
};
