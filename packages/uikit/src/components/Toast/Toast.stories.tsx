import type { Meta, StoryObj } from '@storybook/react';
import { ToastMessage as ToastMessageComponent, ToastProvider, ToastType, useToast } from './Toast';
import { Typography } from '../Typography/Typography';
import { TextInput } from '../TextInput/TextInput';
import { NumberInput } from '../NumberInput/NumberInput';
import { Form } from '../Form/Form';
import { ComponentProps, useState } from 'react';
import { RadioInput } from '../RadioInput/RadioInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  subcomponents: { ToastMessage: ToastMessageComponent },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Wrap a component tree in a `<ToastProvider>`, then use the `useToast()` hook in any child component to display a toast message.',
      },
    },
  },
  args: {
    onToastCreated: fn(),
    side: 'right',
    duration: 5_000,
  },
  decorators: [
    (Story, { args }) => (
      <ToastProvider {...args}>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function StoryComponent(args: ComponentProps<typeof ToastProvider>) {
    const { activeToasts, clearToasts, createToast } = useToast();
    const [count, setCount] = useState(0);
    const [lastClickedToastId, setLastClickedToastId] = useState('');

    const handleSubmit = (values: Record<'toastMessage' | 'toastDuration' | 'toastType' | 'toastId', string | number>) => {
      const duration = +values.toastDuration;
      const type = values.toastType as ToastType;
      const id = values.toastId ? values.toastId as string : undefined;
      const content = (
        <div className='flex flex-col space-y-2'>
          <Typography.Text className='whitespace-pre-wrap'>{values.toastMessage}</Typography.Text>
        </div>
      );
      const onClick = (toastId: string) => {
        setLastClickedToastId(toastId);
      };
      createToast({ content, duration, type, id, onClick });
      setCount(count + 1);
    };
    return (
      <div className="flex flex-col space-y-2 p-1">
        <Form
          className='flex flex-col space-y-1'
          onReset={clearToasts}
          onSubmit={handleSubmit}
          submitMultiple
          submitText='Create toast message'
        >
          <TextInput
            name="toastId"
            label="Identifier"
            type="text"
            placeholder='If provided, overrides a toast with the same key'
          />
          <TextInput
            name="toastMessage"
            label="Toast message"
            type="textarea"
            defaultValue={`Hello world!\nThis is a toast message.`}
          />
          <NumberInput
            defaultValue={args.duration}
            label="Duration (ms)"
            min={1_000}
            name="toastDuration"
          />
          <RadioInput
            defaultValue='info'
            label='Type'
            name="toastType"
            values={['info', 'success', 'warning']}
          />
        </Form>
        <Typography.Text>Active toasts: {activeToasts.length}</Typography.Text>
        <Typography.Text>Last clicked toast: {lastClickedToastId}</Typography.Text>
      </div>
    )
  },
};

export const ToastMessage = {
  render: function StoryComponent() {
    return (
      <div className="grid grid-cols-2">
        <div className='flex flex-col space-y-2'>
          <ToastMessageComponent
            id="info"
            expires={Infinity}
            type='info'
            content={(<Typography.Text>Info toast</Typography.Text>)}
          />
          <ToastMessageComponent
            id="success"
            expires={Infinity}
            type='success'
            content={(<Typography.Text>Success toast</Typography.Text>)}
          />
          <ToastMessageComponent
            id="warning"
            expires={Infinity}
            type='warning'
            content={(<Typography.Text>Warning toast</Typography.Text>)}
          />
        </div>

        <div className='flex flex-col space-y-2'>
          <ToastMessageComponent
            id="info"
            expires={Date.now() + 5_000}
            type='info'
            content={(<Typography.Text>Info toast</Typography.Text>)}
          />
          <ToastMessageComponent
            id="success"
            expires={Date.now() + 10_000}
            type='success'
            content={(<Typography.Text>Success toast</Typography.Text>)}
          />
          <ToastMessageComponent
            id="warning"
            expires={Date.now() + 15_000}
            type='warning'
            content={(<Typography.Text>Warning toast</Typography.Text>)}
          />
        </div>
      </div>
    )
  }
}