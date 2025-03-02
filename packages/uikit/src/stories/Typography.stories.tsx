import type { Meta, StoryObj } from '@storybook/react';
import { Typography as T, TypographyStyles, TypographyType } from '../components/Typography';
import { createElement } from 'react';
import { Box } from '../components/Box';

const lorem = 'Lorem ipsum dolor sit amet';

const meta = {
  title: 'Data display/Typography',
  // component: Typography,
  tags: ['autodocs'],
  render: function StoryComponent() {
    return (
      <div className="flex flex-col space-y-2">
        {Object.keys(TypographyStyles).map(key => (
          <div key={key} className='grid grid-cols-[100px_auto] gap-4 items-center'>
            <T.Body>{key}</T.Body>
            <div>
              {createElement(T[key as TypographyType], { children: lorem })}
            </div>
          </div>
        ))}
      </div>
    )
  }
} satisfies Meta<typeof T>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExampleThoughtsSection: Story = {
  render: function StoryComponent() {
    return (
      <Box.Paper size='xl'>
        <T.Title>A story about that awesome time</T.Title>
        <T.Subtitle>The beginning of something</T.Subtitle>
        <T.Body>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio quidem blanditiis aperiam ullam maiores ipsa aut, adipisci alias iusto possimus voluptates praesentium quam beatae illo laboriosam nemo culpa dicta distinctio dolor in amet? Tempore laboriosam earum illum placeat! Fugit, voluptates maxime. Impedit, cupiditate nobis libero eaque porro eius blanditiis ipsam soluta laborum! Ipsam, repellat? Maxime accusamus sapiente impedit explicabo commodi earum, voluptas ipsum, nisi, cumque eius porro fugiat sint. Dignissimos cum quis, voluptatibus, optio fugit officiis deserunt possimus assumenda eum expedita aperiam quaerat corporis voluptatum consequuntur autem? Ullam pariatur atque minima libero sint illo! Labore, vero amet? Repellat, odio reprehenderit?
        </T.Body>
        <T.Caption>Kinda getting it now...</T.Caption>
        <T.Body>In the end, this lead me to: <T.Code>const a = 1;</T.Code> and <T.Code>const b = 2;</T.Code> - which is pretty cool I think!</T.Body>
      </Box.Paper>
    )
  }
};
