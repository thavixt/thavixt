import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './SelectInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/Select input',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = {
  cat: 'Cat',
  dog: 'Dog',
  goldfish: 'Goldfish',
  hamster: 'Hamster',
}
const generatedItems = new Array(20)
  .fill(0)
  .map((_, i) => {
    const index = `Animal#${i}`;
    return { [index]: index };
  }).reduce((prev, cur) => {
    return {
      ...prev,
      ...cur,
    };
  }, items);

export const Default: Story = {
  args: {
    defaultValue: 'cat',
    onChange: fn(),
    label: 'Select an animal',
    name: 'animal',
    options: generatedItems,
  }
};
