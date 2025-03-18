import type { Meta, StoryObj } from '@storybook/react';
import { Quote } from './Quote';

const meta = {
  title: 'Layout/Quote',
  component: Quote,
  tags: ['autodocs'],
  args: {
    children: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
    by: 'Steve Jobs, american businessman (1955-2011)',
  }
} satisfies Meta<typeof Quote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLink: Story = {
  args: {
    children: "It's not a faith in technology. It's faith in people.",
    link: 'https://www.brainyquote.com/quotes/steve_jobs_416920',
  }
};
