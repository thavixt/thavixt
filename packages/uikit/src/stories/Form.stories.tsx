import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Form } from '../components/Form';
import { TextInput } from '../components/TextInput';
import { NumberInput } from '../components/NumberInput';

const meta = {
  title: 'Input/Form',
  component: Form,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Form>) {
    return (
      <Form {...args}>
        <TextInput label="Name" placeholder="Your name" name='name'/>
        <TextInput label="Occupation" placeholder="Job title" name='job'/>
        <NumberInput label='Age' defaultValue={18} name='experience'/>
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
    onSubmit: fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 2_000));
    }),
  },
};

export const ErrorOnSubmit: Story = {
  args: {
    onSubmit: fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 2_000));
      throw new Error('uhmmm, are you really called that?');
    }),
  },
};
