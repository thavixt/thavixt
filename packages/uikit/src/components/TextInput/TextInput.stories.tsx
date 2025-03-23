import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/Text input',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    name: 'input',
    label: 'Input',
    defaultValue: 'something about that',
    onChange: fn(),
  }
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
  }
};

export const Textarea: Story = {
  args: {
    type: 'textarea',
  }
};
