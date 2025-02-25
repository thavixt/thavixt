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
    cancel: 'Cancel',
    children: undefined,
    className: 'border-red-500 text-sm',
    onCancel: fn(),
    onSubmit: fn(async () => {
      console.log('submitting...');
      await new Promise(resolve => setTimeout(resolve, 2_000));
      console.log('submit done');
    }),
    submit: undefined,
  },
};

export const ErrorOnSubmit: Story = {
  args: {
    cancel: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    onCancel: fn(),
    onSubmit: fn(async () => {
      console.log('submitting...');
      await new Promise(resolve => setTimeout(resolve, 2_000));
      throw new Error('uhmmm, are you really called that?');
    }),
    submit: undefined,
  },
};
