import type { Meta, StoryObj } from '@storybook/react';
import { AccordionGroup } from './AccordionGroup';
import { Typography } from '../Typography/Typography';
import { ComponentProps } from 'react';
import { Accordion } from '../Accordion/Accordion';
import { fn } from '@storybook/test';

const meta = {
  title: 'Layout/Accordion group',
  component: AccordionGroup,
  tags: ['autodocs'],
  args: {
    onOpen: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof AccordionGroup>) {
    return (
      <AccordionGroup {...args}>

        <Accordion title='Introduction'>
          <Typography type='subtitle'>Welcome {':)'}</Typography>
          <Typography type='body'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
          <Typography type='body'>
            Eveniet quam ea modi inventore ad ratione rem magni tempore libero fuga?
          </Typography>
        </Accordion>

        <Accordion title='Technical details' openTitle='Close technical details'>
          <Typography type='subtitle'>Introduction</Typography>
          <Typography type='body'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi autem magni placeat laboriosam quisquam quos, tenetur libero dicta fugit harum necessitatibus error iusto asperiores perferendis fugiat eveniet sequi unde. Aperiam eius ut, repellendus voluptates et culpa deleniti voluptatibus earum laudantium omnis non magnam consequuntur vero maiores nobis ipsa hic minima aliquid expedita eaque nesciunt totam, voluptatem commodi blanditiis? Laudantium eligendi labore ut officiis illo ea quod officia assumenda esse nemo tenetur, laboriosam delectus eos aperiam voluptatibus, sit porro ad quidem culpa quaerat animi voluptatem perspiciatis ipsum?
          </Typography>
          <Typography type='subtitle'>Extras</Typography>
          <Typography type='body'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, blanditiis dignissimos non consequuntur qui cumque adipisci error voluptas repellat veniam.
          </Typography>
        </Accordion>

        <Accordion title='Notes'>
          <Typography type='subtitle'>See you soon!</Typography>
          <Typography type='body'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem!
          </Typography>
        </Accordion>

      </AccordionGroup>
    )
  },
} satisfies Meta<typeof AccordionGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: 1,
  },
};
