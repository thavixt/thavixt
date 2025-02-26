import type { Meta, StoryObj } from '@storybook/react';
import { ScrollPage } from './ScrollPage';
import { ComponentProps } from 'react';
import { fn } from '@storybook/test';

const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, mollitia.';
const getLorem = (count: number) => new Array(count).fill(lorem);

const meta = {
  title: 'Navigation/ScrollPage',
  component: ScrollPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Check the individual `Default` story page instead for a better demo',
      },
    },
  },
  args: {
    to: 'top',
    onClick: fn(),
  },
  render: function StoryComponent(args: ComponentProps<typeof ScrollPage>) {
    return (
      <>
        <div className='text-slate-400'>
          <p>
            <b>Welcome to the top of the page</b>
          </p>
          {getLorem(100).map((text, i) => <p key={i}>{text}</p>)}
          <ScrollPage {...args}/>
          {getLorem(100).map((text, i) => <p key={`${i}-2`}>{text}</p>)}
          <p>
            <b>Welcome to the bottom of the page</b>
          </p>
        </div>
      </>
    )
  }
} satisfies Meta<typeof ScrollPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

