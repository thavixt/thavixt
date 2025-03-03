import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TextInput } from '../TextInput/TextInput';
import { Form } from '../Form/Form';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <Tabs.Tab title='First tab'>
        <p>Content of the first tab</p>
        <p>Anything could go here</p>
      </Tabs.Tab>,
      <Tabs.Tab title="Second tab that has a much longer title">
        <p>So I guess you've already read the first tab?</p>
      </Tabs.Tab>,
      <Tabs.Tab title='Tab with a form'>
        <Form>
          <TextInput name="input1" label='Title' placeholder="Type something and go back to the previous tab" />
          <TextInput name="input2" label='Subject'/>
          <TextInput name="input3" label='Description' placeholder="It'll still be here, dont worry =)" />
          <TextInput name="input4" label='Thoughts'/>
        </Form>
      </Tabs.Tab>
    ]
  }
};
