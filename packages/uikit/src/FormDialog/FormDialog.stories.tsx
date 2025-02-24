import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { FormDialog } from './FormDialog';
import { Button } from '../Button/Button';
import { TextInput } from '../Input/TextInput';

const meta = {
  title: 'Wrapper/Form dialog',
  component: FormDialog,
  parameters: {
    docs: {
      description: {
        component: 'To programmatically show or hide the modal, provide a `ref` for the `<Dialog>`, and call `ref.current.showModal()` or `ref.current.close()`',
      },
    },
  },
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof FormDialog>) {
    const ref = useRef<HTMLDialogElement>(null);
    const onClick = () => ref.current?.showModal();

    return (
      <>
        <Button onClick={onClick}>
          Open dialog
        </Button>
        <FormDialog {...args} ref={ref}>
        {/* <FormDialog {...args}> */}
          <TextInput defaultValue="Your name" name='name'/>
        </FormDialog>
      </>
    )
  },
} satisfies Meta<typeof FormDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cancelBtn: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    defaultOpen: false,
    onCancel: fn(),
    onSubmit: fn(),
    submitBtn: undefined,
    title: 'Dialog example title',
  },
};

export const ErrorOnSubmit: Story = {
  args: {
    cancelBtn: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    defaultOpen: false,
    onCancel: fn(),
    onSubmit: fn(() => {
      throw new Error('whoooops');
    }),
    submitBtn: undefined,
    title: 'Dialog example title',
  },
};
