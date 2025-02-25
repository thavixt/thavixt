import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  title: 'Basic/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    children: 'Lorem ipsum dolor sit amet ... etc. You could fit a lot of text here!',
    title: 'Let me see what this is',
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    openedTitle: 'I\'ve already read this, just close already',
  }
};
