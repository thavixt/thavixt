import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsHandle } from './Tabs';
import { TextInput } from '../TextInput/TextInput';
import { Form } from '../Form/Form';
import { Typography } from '../Typography/Typography';
import { ComponentProps, useRef } from 'react';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    defaultTabIndex: 2,
    children: [
      <Tabs.Tab title='Tab 1'>
        <Typography type="body">Content of the first tab.</Typography>
      </Tabs.Tab>,
      <Tabs.Tab title="Second tab that has a much longer title">
        <Typography type="body">So I guess you've already read the first tab?</Typography>
      </Tabs.Tab>,
      <Tabs.Tab title='Tab with Form'>
        <Form>
          <TextInput name="input2" label='Subject' placeholder="Type something here and go back to the previous tab" />
          <TextInput name="input3" label='Description' placeholder="It'll still be here when you come back" />
        </Form>
      </Tabs.Tab>,
    ]
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Tabs>) {
    const ref = useRef<TabsHandle>(null);
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Button data-testid="prevTab" onClick={() => ref.current?.prevTab()}>Previous tab</Button>
          <Button data-testid="nextTab" onClick={() => ref.current?.nextTab()}>Next tab</Button>
        </div>
        <Tabs {...args} ref={ref} />
      </div>
    )
  },
};
