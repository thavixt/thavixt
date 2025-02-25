import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalRule } from './HorizontalRule';
 
const meta = {
  title: 'Basic/HorizontalRule',
  component: HorizontalRule,
  tags: ['autodocs'],
} satisfies Meta<typeof HorizontalRule>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};