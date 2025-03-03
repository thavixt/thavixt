import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Form } from '../components/Form';
import { TextInput } from '../components/TextInput';
import { NumberInput } from '../components/NumberInput';
import { onSubmit } from './utils';

const meta = {
  title: 'Input/Form',
  component: Form,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Form>) {
    return (
      <Form {...args}>
        <TextInput required label="Name" placeholder="Your name" name='name' />
        <TextInput required defaultValue='software engineer' label="Occupation" placeholder="Job title" name='job' />
        <NumberInput min={18} defaultValue={25} label='Age' name='age' />
      </Form>
    )
  },
  args: {
    className: 'border-red-500 text-sm',
    // onCancel: fn(),
    onSubmitError: fn(),
    onSubmitSuccess: fn(),
  }
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit,
  },
};
