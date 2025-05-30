import type { Meta, StoryObj } from '@storybook/react';
import { RadioInput } from './RadioInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/Radio input',
  component: RadioInput,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'two',
    values: ['one', 'two', 'three'],
    name: 'numbers',
    label: 'Select a number from the list',
    onChange: fn(),
  }
};
