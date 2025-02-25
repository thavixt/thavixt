import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { FormDialog, FormDialogRef } from './FormDialog';
import { TextInput } from './TextInput';
import { Button } from '../Basic/Button';

const meta = {
  title: 'Input/Form dialog',
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
    const ref = useRef<FormDialogRef>(null);
    const onClick = () => ref.current?.dialog?.showModal();

    return (
      <>
        <Button onClick={onClick}>
          Open dialog
        </Button>
        <FormDialog {...args} ref={ref}>
          <TextInput defaultValue="Your name" name='name' label="Name"/>
        </FormDialog>
      </>
    )
  },
} satisfies Meta<typeof FormDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cancel: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    defaultOpen: false,
    onSubmit: fn(async () => {
      console.log('submitting...');
      await new Promise(resolve => setTimeout(resolve, 2_000));
      console.log('submit done');
    }),
    submit: undefined,
    title: 'Dialog example title',
  },
};

export const ErrorOnSubmit: Story = {
  args: {
    cancel: undefined,
    children: undefined,
    className: 'border-red-500 text-sm',
    defaultOpen: false,
    onSubmit: fn(async () => {
      console.log('submitting...');
      await new Promise(resolve => setTimeout(resolve, 2_000));
      throw new Error('uhmmm, are you really called that?');
    }),
    submit: undefined,
    title: 'Dialog example title',
  },
};
