import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { ThemeOverride } from './ThemeOverride';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { ButtonBar } from '../ButtonBar/ButtonBar';

const colors = (
  <div className="flex flex-col space-y-2">
    <div className='bg-gray-200 p-2 grid grid-cols-8 gap-2 *:border-r-32 *:pr-2 *:block *:size-8'>
      <div title="red-500" className='border-red-500' />
      <div title="orange-500" className='border-orange-500' />
      <div title="amber-500" className='border-amber-500' />
      <div title="yellow-500" className='border-yellow-500' />
      <div title="lime-500" className='border-lime-500' />
      <div title="green-500" className='border-green-500' />
      <div title="emerald-500" className='border-emerald-500' />
      <div title="teal-500" className='border-teal-500' />
      <div title="cyan-500" className='border-cyan-500' />
      <div title="sky-500" className='border-sky-500' />
      <div title="blue-500" className='border-blue-500' />
      <div title="indigo-500" className='border-indigo-500' />
      <div title="violet-500" className='border-violet-500' />
      <div title="purple-500" className='border-purple-500' />
      <div title="fuchsia-500" className='border-fuchsia-500' />
      <div title="pink-500" className='border-pink-500' />
      <div title="rose-500" className='border-rose-500' />
      <div title="slate-500" className='border-slate-500' />
      <div title="gray-500" className='border-gray-500' />
      <div title="zinc-500" className='border-zinc-500' />
      <div title="neutral-500" className='border-neutral-500' />
      <div title="stone-500" className='border-stone-500' />
      <div title="black" className='border-black' />
      <div title="white" className='border-white' />
    </div>
    <ButtonBar>
      <Button variant='danger'>danger button (bg-red-500/600/700)</Button>
      <div className='border-2 rounded-md px-2 border-neutral-500'>
        <Typography.Text>border-neutral-500</Typography.Text>
      </div>
      <div className='rounded-sm border border-black bg-white px-2 py-0.5'>
        <span className='text-cyan-500'>border-black bg-white div {'>'} cyan-500 span</span>
      </div>
    </ButtonBar>
  </div>
);

const meta = {
  title: 'Basic/Theme override',
  component: ThemeOverride,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Override the default colors defined by Tailwind, by wrapping a subtree in a `<ThemeOverride>`, and providing a list of `colors`. Reference the defaults at https://tailwindcss.com/docs/colors.',
      },
    },
  },
} satisfies Meta<typeof ThemeOverride>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ColorOverrideExample: Story = {
  args: {
    colors: {
      'black': 'white',
      'white': 'black',
      'cyan-500': 'var(--color-red-500)',
      'lime-500': 'rgb(250, 50, 50)',
      'neutral-500': 'limegreen',
      'red-500': 'red',
      'red-600': 'blue',
      'red-700': 'green',
    },
  },
  render: function StoryComponent(args: ComponentProps<typeof ThemeOverride>) {
    return (
      <div className="flex flex-col space-y-2">
        <Typography.Subtitle>Defaults - hover the colors to view the CSS class name:</Typography.Subtitle>
        {colors}
        <Typography.Subtitle>Override example:</Typography.Subtitle>
        <ThemeOverride {...args}>
          {colors}
        </ThemeOverride>
      </div>
    );
  }
};
