import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalRule } from './HorizontalRule';
import { ComponentProps } from 'react';
 
const meta = {
  title: 'Basic/HorizontalRule',
  component: HorizontalRule,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof HorizontalRule>) {
    return (
      <div className='flex flex-col'>
        Some text
        <HorizontalRule {...args} />
        divided by
        <HorizontalRule {...args} />
        HorizontalRule components
        <HorizontalRule {...args} unicorn />
        colorful one
        <HorizontalRule {...args} small />
        <HorizontalRule {...args} unicorn small />
        and smaller ones
      </div>
    )
  }
} satisfies Meta<typeof HorizontalRule>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};