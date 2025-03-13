import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Inplace } from './Inplace';
import { TextInput } from '../TextInput/TextInput';
import { ComponentProps, useState } from 'react';

const meta = {
  title: 'Utility/Inplace',
  component: Inplace,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Inplace is used to replace the content of an element on click - useful to create interactive data display elements.',
      },
    },
  },
  args: {
    onReplace: fn(),
    children: 'Click to replace me',
    replacement: <TextInput name='q' defaultValue='state' />,
  },
} satisfies Meta<typeof Inplace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Inplace>) {
    const [value, setValue] = useState('something');
    return (
      <Inplace {...args} replacement={<TextInput name='q' defaultValue={value} onEnter={v => setValue(v)} />} />
    )
  },
};
