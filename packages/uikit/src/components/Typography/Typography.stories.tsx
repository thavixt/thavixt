import type { Meta, StoryObj } from '@storybook/react';
import { Typography, TypographyStyles, TypographyType } from '../Typography/Typography';
import { createElement } from 'react';
import { Box } from '../Box/Box';

const lorem = 'Lorem ipsum dolor sit amet';

const meta = {
  title: 'Basic/Typography',
  // component: Typography,
  tags: ['autodocs'],
  render: function StoryComponent() {
    return (
      <div className="flex flex-col space-y-2">
        {Object.keys(TypographyStyles).map(key => (
          <div key={key} className='grid grid-cols-[100px_auto] gap-4 items-center'>
            <Typography.Body>{key}</Typography.Body>
            <div>
              {createElement(Typography[key as TypographyType], { children: lorem })}
            </div>
          </div>
        ))}
      </div>
    )
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExampleThoughtsSection: Story = {
  render: function StoryComponent() {
    return (
      <Box type='paper' size='lg'>
        <Box.Header>
          <Typography.Title>Title about doing that thing</Typography.Title>
        </Box.Header>
        <Box.Content>
          <Typography.Subtitle>Subtitle for this revolutionary techique I came up with</Typography.Subtitle>
          <Typography.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing eli. Odio quidem blanditiis aperiam ullam maiores ipsa aut, adipisci alias iusto possimus voluptates praesentium quam beatae illo laboriosam nemo culpa dicta distinctio dolor in amet? Tempore laboriosam earum illum placeat! Fugit, voluptates maxime.
          </Typography.Body>
          <Typography.Caption>Okay, but how do i <em>actually </em> do it?</Typography.Caption>
          <Typography.Body>
            Nihil veritatis nostrum eveniet architecto molestiae voluptatum adipisci amet iure quaerat laborum repellat, impedit quam rem a animi laboriosam non quas consequuntur!
          </Typography.Body>
          <Typography.Body>
            Ex, beatae excepturi? Accusantium ipsa quam similique quaerat dolor facere odio possimus iusto. Eos aut explicabo, tempora laborum molestias dolorum ex ipsum, numquam dolore itaque cupiditate rem. Nulla libero ut sed pariatur delectus deleniti laboriosam asperiores, veritatis harum quis necessitatibus debitis. Quaerat?
          </Typography.Body>
          <Typography.Body>The solution is: <Typography.Code>type TailwindColor = {'`${Color}-${Number}`'};</Typography.Code></Typography.Body>
        </Box.Content>
      </Box>
    )
  }
};
