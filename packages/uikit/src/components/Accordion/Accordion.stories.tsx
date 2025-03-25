import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionBody, AccordionOpenTitle, AccordionTitle } from './Accordion';
import { fn } from '@storybook/test';
import { Typography } from '../Typography/Typography';
import { ComponentProps } from 'react';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    onOpen: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof Accordion>) {
    return (
      <Accordion {...args}>
        <AccordionTitle>
          <Typography.Text>Implementation details</Typography.Text>
        </AccordionTitle>
        <AccordionOpenTitle>
          <Typography.Text>Close implementation details</Typography.Text>
        </AccordionOpenTitle>
        <AccordionBody>
          <Typography.Subtitle>Subtitle of this block of text</Typography.Subtitle>
          <Typography.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum iste quo voluptates minima non aliquam corporis accusantium veritatis ad enim quisquam repudiandae facilis laboriosam mollitia error dolore, beatae cumque ut possimus vitae laborum labore at? Odit temporibus perspiciatis quos, optio libero magnam ut debitis minus ipsam reprehenderit dignissimos consequuntur necessitatibus magni cumque molestiae. Quam sit voluptatibus voluptas corrupti consequatur laborum, eius, debitis eligendi, labore consequuntur perspiciatis reiciendis. Magnam illum incidunt autem quo similique cum nostrum sunt, nihil pariatur, repudiandae, minima culpa. Voluptatibus minus saepe ea est, vero itaque cumque ut, necessitatibus inventore totam placeat odit maiores unde dolore natus nostrum.
          </Typography.Body>
          <Typography.Caption>Caption about the next block of text</Typography.Caption>
          <Typography.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum iste quo voluptates minima non aliquam corporis accusantium veritatis ad enim quisquam repudiandae facilis laboriosam mollitia error dolore, beatae cumque ut possimus vitae laborum labore at? Odit temporibus perspiciatis quos, optio libero magnam ut debitis minus ipsam reprehenderit dignissimos consequuntur necessitatibus magni cumque molestiae.
          </Typography.Body>
        </AccordionBody>
      </Accordion>
    )
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
