import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { Link } from '../Link/Link';

const meta = {
  title: 'Basic/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      '@thavixt',
      'uikit',
      <Link href='http://localhost:6066/?path=/docs' self>Components</Link>,
      <Link href='http://localhost:6066/?path=/docs/basic-breadcrumbs--overview' self>Basic</Link>,
      'Breadcrumbs',
    ]
  }
};
