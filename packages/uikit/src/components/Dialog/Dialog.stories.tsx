import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useRef } from 'react';
import { Dialog, DialogHandle } from './Dialog';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { TextInput } from '../TextInput/TextInput';
import { RadioInput } from '../RadioInput/RadioInput';
import { fn, userEvent, within, expect } from '@storybook/test';
import { sleep } from '../../common/utils';

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
    open: false,
    closeIcon: true,
    closeOnClickOutside: false,
    onClose: fn(),
    onOpen: fn(),
    title: "Dialog example",
    children: () => (
      <>
        <Typography.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ullam libero exercitationem veniam sint harum minus, repudiandae quis corrupti laborum odit, quo ut nam eligendi voluptatibus nostrum suscipit aliquid. A fuga quo impedit labore perspiciatis possimus quaerat alias corporis, incidunt, facilis porro nemo quibusdam autem saepe expedita, explicabo veniam! Quia quibusdam cupiditate, quisquam corrupti fuga molestias voluptatem corporis earum ex veritatis dolore sequi alias harum consectetur velit dolor eum, aspernatur recusandae iure similique doloribus impedit commodi, cum mollitia. Optio libero, nemo beatae, dolore iusto sunt veniam, deleniti modi est perferendis doloremque quisquam praesentium corporis nihil illum quibusdam dignissimos voluptates molestiae!
        </Typography.Body>
        <div className="flex flex-col space-y-2 pt-2">
          <TextInput inline name='something' label='Something' defaultValue="Anything could happen with this" />
          <RadioInput inline name='radio' values={['first', 'second']} defaultValue='second' label='Radio input' />
        </div>
      </>
    ),
  },
  render: function StoryComponent(args: ComponentProps<typeof Dialog>) {
    const ref = useRef<DialogHandle>(null);
    const onClick = () => ref.current?.open();
    return (
      <>
        <Typography.Body>
          Dialog is {args.open ? 'opened' : 'initially open, then closed'}.
        </Typography.Body>
        <Button variant='primary' onClick={onClick} data-testid="OpenDialogButton">
          Open dialog
        </Button>
        <Dialog {...args} ref={ref} />
      </>
    )
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('OpenDialogButton'));
    await sleep(300);
    expect(canvas.getByTestId('Dialog') as HTMLElement).toBeVisible();
    await userEvent.click(canvas.getByTestId('DialogCloseButton'));
    await sleep(300);
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};

