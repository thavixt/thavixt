import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps, useRef } from 'react';
import { Dialog, DialogHandle } from './Dialog';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
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
    closeIcon: true,
    closeOnClickOutside: false,
    onClose: fn(),
    onOpen: fn(),
    open: false,
    title: "Dialog example",
    children: () => (
      <>
        <Typography.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ullam libero exercitationem veniam sint harum minus, repudiandae quis corrupti laborum odit, quo ut nam eligendi voluptatibus nostrum suscipit aliquid. A fuga quo impedit labore perspiciatis possimus quaerat alias corporis, incidunt, facilis porro nemo quibusdam autem saepe expedita, explicabo veniam! Quia quibusdam cupiditate, quisquam corrupti fuga molestias voluptatem corporis earum ex veritatis dolore sequi alias harum consectetur velit dolor eum, aspernatur recusandae iure similique doloribus impedit commodi, cum mollitia. Optio libero, nemo beatae, dolore iusto sunt veniam, deleniti modi est perferendis doloremque quisquam praesentium corporis nihil illum quibusdam dignissimos voluptates molestiae!
        </Typography.Body>
        <TextInput disabled inline name='something' label='Something' defaultValue="Can't change this"/>
        <RadioInput disabled inline name='radio' values={['first', 'second']} defaultValue='second' label='Radio input'/>
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

