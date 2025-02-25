import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Form } from './Form';
import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';

const meta = {
  title: 'Input/Form',
  component: Form,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Form>) {
    return (
      <Form {...args}>
        <TextInput label="Name" defaultValue="Your name" name='name'/>
        <TextInput label="Title" defaultValue="Job title" name='job'/>
        <NumberInput label='Past work experience (years)' defaultValue={10} name='experience'/>
      </Form>
    )
  },
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cancelBtn: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    onCancel: fn(),
    onSubmit: fn(),
    submitBtn: undefined,
  },
};

export const ErrorOnSubmit: Story = {
  args: {
    cancelBtn: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    onCancel: fn(),
    onSubmit: fn(() => {
      throw new Error('uhmmm, are you really called that?');
    }),
    submitBtn: undefined,
  },
};
