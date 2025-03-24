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
          <Typography.Title>Title of the story about that awesome time</Typography.Title>
        </Box.Header>
        <Box.Content>
          <Typography.Subtitle>Subtitle about the beginning of something</Typography.Subtitle>
          <Typography.Body>
            Body text in latin - Lorem ipsum dolor, sit amet consectetur adipisicing eliTypography. Odio quidem blanditiis aperiam ullam maiores ipsa aut, adipisci alias iusto possimus voluptates praesentium quam beatae illo laboriosam nemo culpa dicta distinctio dolor in amet? Tempore laboriosam earum illum placeat! Fugit, voluptates maxime. Impedit, cupiditate nobis libero eaque porro eius blanditiis ipsam soluta laborum! Ipsam, repellat? Maxime accusamus sapiente impedit explicabo commodi earum, voluptas ipsum, nisi, cumque eius porro fugiat sinTypography. Dignissimos cum quis, voluptatibus, optio fugit officiis deserunt possimus assumenda eum expedita aperiam quaerat corporis voluptatum consequuntur autem? Ullam pariatur atque minima libero sint illo! Labore, vero amet? Repellat, odio reprehenderit?
          </Typography.Body>
          <Typography.Caption>Caption - kinda getting it now...</Typography.Caption>
          <Typography.Body>The result looked like this: <Typography.Code>type TailwindColor = {'`${Color}-${Number}`'};</Typography.Code></Typography.Body>
        </Box.Content>
      </Box>
    )
  }
};
