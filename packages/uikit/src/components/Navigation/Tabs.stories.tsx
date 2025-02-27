import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TextInput } from '../Input/TextInput';
import { Form } from '../Input/Form';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const placeholder = "type something and go back to the previous tab";
export const Default: Story = {
  args: {
    children: [
      <p>asd</p>,
      <Tabs.Tab title='First tab'>
        <p>content of the first tab</p>
        <p>anything could go here...</p>
      </Tabs.Tab>,
      <Tabs.Tab title="Second tab that has a much longer title">
        <p>so I guess you've already read the first tab?</p>
      </Tabs.Tab>,
      <Tabs.Tab title='Tab with a form'>
        <Form>
          <TextInput name="input1" label='Title' placeholder={placeholder} />
          <TextInput name="input2" label='Subject' placeholder={placeholder} />
          <TextInput name="input3" label='Description' placeholder={placeholder} />
          <TextInput name="input4" label='Thoughts' placeholder={placeholder} />
        </Form>
      </Tabs.Tab>
    ]
  }
};
