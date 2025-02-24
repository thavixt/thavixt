import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { fn } from '@storybook/test';
 
const meta = {
  title: 'Input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    defaultValue: 'some input string',
    onChange: fn(),
    type: 'input',
  }
} satisfies Meta<typeof TextInput>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Textarea: Story = {
  args: {
    type: 'textarea',
  }
};