import type { Meta, StoryObj } from '@storybook/react';
import { SwitchInput } from './SwitchInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Input/SwitchInput',
  component: SwitchInput,
  tags: ['autodocs'],
  args: {
    defaultChecked: true,
    disabled: false,
    label: 'Light switch',
    name: 'lightSwitch',
    onChange: fn(),
  }
} satisfies Meta<typeof SwitchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};