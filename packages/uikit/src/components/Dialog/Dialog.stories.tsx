import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { Dialog, DialogHandle } from './Dialog';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { TextInput } from '../TextInput/TextInput';
import { RadioInput } from '../RadioInput/RadioInput';

const meta = {
  title: 'Layout/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: 'To programmatically show or hide the modal, provide a `ref` for the `<Dialog>`, and call `ref.current.open()` or `ref.current.close()`',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    closeIcon: false,
    closeOnClickOutside: true,
    onClose: fn(),
    onOpen: fn(),
    open: false,
    title: "Dialog example",
    children: (close) => (
      <>
        <Typography.Body>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, maxime?</Typography.Body>
        <TextInput name='something' label='Something' placeholder='Something about that'/>
        <RadioInput name='radio' values={['first', 'second']} defaultValue='second' label='Radio input'/>
        <ButtonBar full>
          <Button onClick={close}>Close</Button>
        </ButtonBar>
      </>
    ),
  },
  render: function StoryComponent(args: ComponentProps<typeof Dialog>) {
    const ref = useRef<DialogHandle>(null);
    const onClick = () => ref.current?.open();
    return (
      <>
        <Button onClick={onClick}>
          Open dialog
        </Button>
        <Dialog {...args} ref={ref} />
      </>
    )
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

