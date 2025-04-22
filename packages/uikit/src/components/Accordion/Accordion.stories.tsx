import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Typography } from '../Typography/Typography';
import { ComponentProps } from 'react';
import { userEvent, within, expect, fn } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    onOpen: fn(),
    title: 'Implementation details',
    openTitle: 'Close implementation details',
  },
  render: function StoryComponent(args: ComponentProps<typeof Accordion>) {
    return (
      <Accordion {...args}>
        <Typography type="caption">Caption of this block of text</Typography>
        <Typography type="body">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum iste quo voluptates minima non aliquam corporis accusantium veritatis ad enim quisquam repudiandae facilis laboriosam mollitia error dolore.
        </Typography>
        <Typography type="caption">Caption about the next block of text</Typography>
        <Typography type="body">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum iste quo voluptates minima non aliquam corporis accusantium veritatis ad enim quisquam repudiandae facilis laboriosam mollitia error dolore, beatae cumque ut possimus vitae laborum labore at? Odit temporibus perspiciatis quos, optio libero magnam ut debitis minus ipsam reprehenderit dignissimos consequuntur necessitatibus magni cumque molestiae.
        </Typography >
      </Accordion>
    )
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('AccordionTitle')).toBeVisible();
    expect(canvas.queryByTestId('AccordionOpenTitle')).not.toBeInTheDocument();
    userEvent.click(canvas.getByTestId('AccordionTitle'));
    await sleep(500);
    expect(canvas.queryByTestId('AccordionTitle')).not.toBeInTheDocument();
    expect(canvas.getByTestId('AccordionOpenTitle')).toBeVisible();
    userEvent.click(canvas.getByTestId('AccordionOpenTitle'));
    await sleep(250);
    expect(canvas.getByTestId('AccordionTitle')).toBeVisible();
    expect(canvas.queryByTestId('AccordionOpenTitle')).not.toBeInTheDocument();
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
  },
};