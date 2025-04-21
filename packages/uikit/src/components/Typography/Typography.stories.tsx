import type { Meta, StoryObj } from '@storybook/react';
import { Typography as Typography } from '../Typography/Typography';

const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam similique tenetur sequi dolore iste debitis, tempore, culpa eum eveniet odio inventore, blanditiis quos molestiae. Provident, doloremque. Vitae unde excepturi, hic alias molestiae suscipit asperiores? Iste nam, tenetur amet ea eum architecto nesciunt dicta consequuntur dignissimos id, aliquid hic laborum odit?';
const lorem2 = 'Accusantium quisquam dolor repellat ad sed, est optio ullam deleniti tenetur consequatur nulla soluta velit minima voluptatibus libero eligendi enim veniam officia fugiat fugit pariatur quis excepturi doloremque tempora?';

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
        <Typography type="h1">Application title</Typography>
        <Typography type="text">h2</Typography>
        <Typography type="h2">Page title</Typography>
        <Typography type="text">title</Typography>
        <Typography type="title">Article title, leading the eyes</Typography>
        <Typography type="text">subtitle</Typography>
        <Typography type="subtitle">Subtitle of the article</Typography>
        <Typography type="text">caption</Typography>
        <Typography type="caption">Caption text with my thoughts</Typography>
        <Typography type="text">body</Typography>
        <Typography type="body">{lorem}</Typography>
        <Typography type="text">body2</Typography>
        <Typography type="body2">A wise man once said: "{lorem2}"</Typography>
        <Typography type="text">text</Typography>
        <Typography type="text">Text snippet about anything</Typography>
        <Typography type="text">label</Typography>
        <Typography type="label">Input label</Typography>
        <Typography type="text">button</Typography>
        <Typography type="button">Button text</Typography>
        <Typography type="text">code</Typography>
        <Typography type="code">{`createReactUI('withoutChatGPT');`}</Typography>
      </div>
    )
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {};
