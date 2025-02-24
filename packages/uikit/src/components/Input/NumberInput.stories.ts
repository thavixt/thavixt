import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/Number',
  component: NumberInput,
  tags: ['autodocs'],
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 12345,
    onChange: fn(),
    label: 'Give me a number',
    name: 'number',
  }
};
