import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { FormDialog, FormDialogRef } from '../components/FormDialog';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { NumberInput } from '../components/NumberInput';

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
          <TextInput placeholder="Your name" name='name' label="Name"/>
          <TextInput label="Occupation" placeholder="Job title" name='job'/>
          <NumberInput label='Age' defaultValue={18} name='experience'/>
        </FormDialog>
      </>
    )
  },
  args: {
    className: 'border-red-500 text-sm',
    // onCancel: fn(),
    onSubmitError: fn(),
    onSubmitSuccess: fn(),
    title: 'Dialog example title',
  }
} satisfies Meta<typeof FormDialog>;

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
