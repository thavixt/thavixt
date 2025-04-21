import type { Meta, StoryObj } from '@storybook/react';
import { T as Typography } from '../Typography/Typography';

const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum sit aliquam et doloribus, esse omnis quas, modi quaerat sequi qui, pariatur hic ipsa! Quis deserunt magnam, saepe ratione veritatis quam.';

const meta = {
  title: 'Basic/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    type: 'body',
    className: '',
  },
  render: function StoryComponent() {
    return (
      <div
        className='grid grid-cols-[100px_auto] items-center gap-2'
      >
        <Typography type="text">h1</Typography>
        <Typography type="h1">Heading</Typography>
        <Typography type="text">h2</Typography>
        <Typography type="h2">Heading</Typography>
        <Typography type="text">title</Typography>
        <Typography type="title">Title text</Typography>
        <Typography type="text">subtitle</Typography>
        <Typography type="subtitle">Subtitle text</Typography>
        <Typography type="text">body</Typography>
        <Typography type="body">{lorem}</Typography>
        <Typography type="text">body2</Typography>
        <Typography type="body2">{lorem}</Typography>
        <Typography type="text">text</Typography>
        <Typography type="text">{lorem.slice(0, 11)}</Typography>
        <Typography type="text">label</Typography>
        <Typography type="label">{lorem.slice(0, 11)}</Typography>
        <Typography type="text">button</Typography>
        <Typography type="button">{lorem.slice(0, 11)}</Typography>
        <Typography type="text">code</Typography>
        <Typography type="code">{`create('withoutGemini');`}</Typography>
      </div>
    )
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {};
