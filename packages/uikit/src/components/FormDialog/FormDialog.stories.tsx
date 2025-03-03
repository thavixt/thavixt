import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { FormDialog, FormDialogRef } from '../FormDialog/FormDialog';
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
          <TextInput required placeholder="Your name" name='name' label="Name"/>
          <TextInput required label="Occupation" placeholder="Job title" name='job'/>
          <NumberInput min={18} label='Age' defaultValue={25} name='experience'/>
        </FormDialog>
      </>
    )
  },
  args: {
    className: 'border-red-500 text-sm',
    onSubmitError: fn(),
    onSubmitSuccess: fn(),
    title: 'Dialog example title',
  }
} satisfies Meta<typeof FormDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit,
  },
};

