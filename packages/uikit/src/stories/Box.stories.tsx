import type { Meta, StoryObj } from '@storybook/react';
import { Box as B, BoxStyles, BoxType } from '../components/Box';
import { createElement } from 'react';
import { Typography as T } from '../components/Typography';
import { Link } from '../components/Link';

const lorem = 'Lorem ipsum dolor sit amet';
const lorem1 = 'Consectetur adipisicing elit. Ameci vero?';
const lorem2 = 'Voluptate, similique ab nemo, voluptas perferendis nihil tempore libero et molestias iusto aperiam! Minus eligendi error cum amet natus';

const boxContent = <>
  <T.Title>{lorem}</T.Title>
  <T.Caption>{lorem1}</T.Caption>
  <T.Body>{lorem2}</T.Body>
  <Link href="javascript:;">Click here for more</Link>
</>

const meta = {
  title: 'Layout/Box',
  // component: Typography,
  tags: ['autodocs'],
  render: function StoryComponent() {
    return (
      <div className="flex flex-col space-y-8">
        {Object.keys(BoxStyles).map(key => (
          <div key={key} className='grid grid-cols-[100px_auto] gap-4 items-center'>
            <T.Body>Box.{key}</T.Body>
            <div>
              {createElement(B[key as BoxType], { children: boxContent })}
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

