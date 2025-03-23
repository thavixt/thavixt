import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { ButtonBar } from './ButtonBar';

const meta = {
  title: 'Basic/Button bar',
  component: ButtonBar,
  tags: ['autodocs'],
  args: {
    children: <>
      <Button variant='danger'>danger</Button>
      <Button variant='default'>default</Button>
      <Button variant='primary'>primary</Button>
      <Button variant='secondary'>secondary</Button>
      <Button variant='silent'>silent</Button>
    </>,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
