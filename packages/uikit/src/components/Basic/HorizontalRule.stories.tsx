import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalRule } from './HorizontalRule';
import { ComponentProps } from 'react';
 
const meta = {
  title: 'Basic/HorizontalRule',
  component: HorizontalRule,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof HorizontalRule>) {
    return (
      <div className='flex flex-col text-slate-900 dark:text-slate-200 text-center'>
        This text is divided by
        <HorizontalRule {...args} />
        HorizontalRule components
        <HorizontalRule {...args} unicorn />
        which are just some lines which could be
        <HorizontalRule {...args} small />
        <HorizontalRule {...args} unicorn small />
        full-width or smaller, colorful or plain gray by default.
      </div>
    )
  }
} satisfies Meta<typeof HorizontalRule>;
 
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};