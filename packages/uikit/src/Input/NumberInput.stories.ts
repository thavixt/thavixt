import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { fn } from '@storybook/test';
 
const meta = {
  title: 'Input/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {
    defaultValue: 12345,
    onChange: fn(),
    label: 'Give me a number',
    name: 'number',
  }
} satisfies Meta<typeof NumberInput>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};