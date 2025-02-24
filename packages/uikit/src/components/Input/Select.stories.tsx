import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { fn } from '@storybook/test';
 
const meta = {
  title: 'Input/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'cat',
    onChange: fn(),
    label: 'Select an animal',
    name: 'animal',
    options: {
      dog: 'Dog',
      cat: 'Cat',
      spider: 'Spider (ew...)',
      elephant: 'Elephant',
    }
  }
};