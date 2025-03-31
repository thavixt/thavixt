import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { FormDialog, FormDialogHandle } from './FormDialog';
import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button';
import { NumberInput } from '../NumberInput/NumberInput';
import { onSubmit } from '../utils';

const meta = {
  title: 'Input/Form dialog',
  component: FormDialog,
  parameters: {
    docs: {
      description: {
        component: 'To programmatically show or hide the modal, provide a `ref` for the `<Dialog>`, and call `ref.current.open()` or `ref.current.close()`',
      },
    },
  },
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof FormDialog>) {
    const ref = useRef<FormDialogHandle>(null);
    const onClick = () => ref.current?.current?.open();

    return (
      <>
        <Button onClick={onClick}>
          Open dialog
        </Button>
        <FormDialog {...args} ref={ref}>
          <TextInput inline required label="Name" placeholder="Your name" name='name'/>
          <TextInput inline required label="Occupation" placeholder="Job title" name='job'/>
          <NumberInput inline min={18} label='Age' name='experience'/>
        </FormDialog>
      </>
    )
  },
  args: {
    cancelText: 'Cancel',
    className: '',
    closeOnClickOutside: false,
    defaultOpen: false,
    onClose: fn(),
    onOpen: fn(),
    onSubmit,
    onSubmitError: fn(),
    onSubmitSuccess: fn(),
    open: false,
    resetText: 'Reset',
    submitText: 'Submit',
    title: 'Dialog example title',
  }
} satisfies Meta<typeof FormDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

