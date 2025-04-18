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
        <Accordion>
          <Accordion.Title>
            <Typography.Text>Introduction</Typography.Text>
          </Accordion.Title>
          <Accordion.Body>
            <Typography.Subtitle>Welcome {':)'}</Typography.Subtitle>
            <Typography.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography.Body>
            <Typography.Body>
              Eveniet quam ea modi inventore ad ratione rem magni tempore libero fuga?
            </Typography.Body>
          </Accordion.Body>
        </Accordion>

        <Accordion>
          <Accordion.Title>
            <Typography.Text>Technical details</Typography.Text>
          </Accordion.Title>
          <Accordion.OpenTitle>
            <Typography.Text>Close technical details</Typography.Text>
          </Accordion.OpenTitle>
          <Accordion.Body>
            <Typography.Subtitle>Introduction</Typography.Subtitle>
            <Typography.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi autem magni placeat laboriosam quisquam quos, tenetur libero dicta fugit harum necessitatibus error iusto asperiores perferendis fugiat eveniet sequi unde. Aperiam eius ut, repellendus voluptates et culpa deleniti voluptatibus earum laudantium omnis non magnam consequuntur vero maiores nobis ipsa hic minima aliquid expedita eaque nesciunt totam, voluptatem commodi blanditiis? Laudantium eligendi labore ut officiis illo ea quod officia assumenda esse nemo tenetur, laboriosam delectus eos aperiam voluptatibus, sit porro ad quidem culpa quaerat animi voluptatem perspiciatis ipsum?
            </Typography.Body>
            <Typography.Caption>Extras</Typography.Caption>
            <Typography.Body>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, blanditiis dignissimos non consequuntur qui cumque adipisci error voluptas repellat veniam.
            </Typography.Body>
          </Accordion.Body>
        </Accordion>

        <Accordion>
          <Accordion.Title>
            <Typography.Text>Technical details 2</Typography.Text>
          </Accordion.Title>
          <Accordion.OpenTitle>
            <Typography.Text>Close technical details 2</Typography.Text>
          </Accordion.OpenTitle>
          <Accordion.Body>
            <Typography.Subtitle>Introduction</Typography.Subtitle>
            <Typography.Body>
              Asperiores, eius laudantium perferendis quibusdam blanditiis deleniti id vel ratione natus, libero dolores animi quod dignissimos ducimus exercitationem voluptatibus eligendi nam rerum sit laborum! Hic quam quidem accusantium tenetur repellendus impedit optio totam voluptates ratione quas quae necessitatibus inventore rerum est pariatur fugiat quisquam facere atque commodi veniam amet, dolor voluptatibus velit fugit. Corrupti unde, nam ipsum voluptates quo dolorum modi praesentium ex doloremque itaque magni minus ea neque voluptatibus eum eaque assumenda consequatur cum sint. Ipsa nam accusantium eius voluptate, eum odio optio ut, quisquam sint sit nobis facilis! Nulla distinctio eligendi praesentium facilis facere quaerat fuga dolores accusantium exercitationem voluptatem a dicta, quos natus minus. Voluptate ad illum ipsa labore in. Quisquam natus quis eum velit culpa ipsum! Veniam architecto error debitis voluptatum quia dicta, rerum ducimus magni ad ab inventore adipisci iste, soluta quae assumenda quam enim nostrum odio repellendus aut et voluptates id facere voluptatem. Id architecto dolorum aspernatur. Accusantium vel reiciendis illum deleniti modi voluptatum odit!
            </Typography.Body>
            <Typography.Caption>Mote extras</Typography.Caption>
            <Typography.Body>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, blanditiis dignissimos non consequuntur qui cumque adipisci error voluptas repellat veniam.
            </Typography.Body>
          </Accordion.Body>
        </Accordion>

        <Accordion>
          <Accordion.Title>
            <Typography.Text>Notes</Typography.Text>
          </Accordion.Title>
          <Accordion.Body>
            <Typography.Subtitle>See you soon!</Typography.Subtitle>
            <Typography.Body>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, voluptatem!
            </Typography.Body>
          </Accordion.Body>
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
