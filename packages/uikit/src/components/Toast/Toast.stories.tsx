import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, ToastType, useToast } from './Toast';
import { Typography } from '../Typography/Typography';
import { TextInput } from '../TextInput/TextInput';
import { NumberInput } from '../NumberInput/NumberInput';
import { Form } from '../Form/Form';
import { useState } from 'react';
import { RadioInput } from '../RadioInput/RadioInput';

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Wrap a component tree in a `<ToastProvider>`, then use the `useToast()` hook in any child component to display a toast message.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='h-[500px]'>
        <ToastProvider side="right">
          <Story />
        </ToastProvider>
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        excludeDecorators: false,
        language: 'tsx',
      },
    },
  },
  render: function StoryComponent() {
    const { activeToasts, clearToasts, createToast } = useToast();
    const [count, setCount] = useState(0);

    const handleSubmit = (values: Record<'toastMessage' | 'toastDuration' | 'toastType', string | number>) => {
      const duration = +values.toastDuration;
      const type = values.toastType as ToastType;
      const content = (
        <div className='flex flex-col space-y-2'>
          <Typography.Text className='whitespace-pre-wrap'>{values.toastMessage}</Typography.Text>
        </div>
      );
      const onClick = () => console.log(`Toast#${count} clicked`);
      createToast({ content, duration, type, onClick });
      setCount(count + 1);
    };
    return (
      <div className="flex flex-col space-y-2">
        <Form
          className='flex flex-col space-y-1'
          onReset={clearToasts}
          onSubmit={handleSubmit}
          submitMultiple
          submitText='Create toast message'
        >
          <TextInput
            name="toastMessage"
            label="Toast message"
            type="textarea"
            defaultValue={`Important message\n(and a small note)`}
          />
          <NumberInput
            defaultValue={15_000}
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
      </div>
    )
  },
};
