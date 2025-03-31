import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Form } from './Form';
import { TextInput } from '../TextInput/TextInput';
import { NumberInput } from '../NumberInput/NumberInput';
import { onSubmit } from '../utils';

const meta = {
  title: 'Input/Form',
  component: Form,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Form>) {
    return (
      <Form {...args}>
        <TextInput inline required label="Name" placeholder="Your name" name='name' defaultValue='Jane Doe' />
        <TextInput inline required label="Occupation" placeholder="Job title" name='job' defaultValue='software engineer' />
        <NumberInput inline min={18} label='Age' name='age' defaultValue={21} />
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
