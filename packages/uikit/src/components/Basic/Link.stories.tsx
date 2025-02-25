import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Basic/Link',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click here to go somewhere',
    href: 'https://komlosidev.net/',
  }
};

export const WithIcon: Story = {
  args: {
    children: 'Click here to go somewhere',
    href: 'https://komlosidev.net/',
    icon: true,
  }
};
