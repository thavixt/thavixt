import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/Accordion';
import { fn } from '@storybook/test';
import { Typography } from '../components/Typography';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    children: (
      <Typography.Body>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus omnis in, et unde fugiat quae cumque assumenda. Commodi beatae dolor, nisi magnam labore corrupti recusandae est assumenda ipsum eum saepe, blanditiis non maxime delectus quibusdam, tenetur minus quas! Soluta, omnis placeat in a voluptas eos labore at eveniet. Inventore, rem.</Typography.Body>
    ),
    defaultOpen: false,
    onOpen: fn(),
    openedTitle: <Typography.Caption>How xyz actually works</Typography.Caption>,
    title: <Typography.Caption>An important note about xyz</Typography.Caption>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  }
};
