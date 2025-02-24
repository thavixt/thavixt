import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/Text',
  component: TextInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'some input string',
    onChange: fn(),
    type: 'input',
  }
};

export const Textarea: Story = {
  args: {
    type: 'textarea',
  }
};
