import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';
import { ButtonBar } from '../Button/ButtonBar';

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
      <Button variant='danger'>danger button (bg-red-500/600)</Button>
      <div className='border-2 rounded-md px-2 border-neutral-500'>border-neutral-500</div>
    </ButtonBar>
  </div>
);

const meta = {
  title: 'Basic/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Override the default colors defined by Tailwind, by wrapping a subtree in a `<ThemeProvider>`, and providing `colors`. Reference for the defaults: https://tailwindcss.com/docs/colors',
      },
    },
  },
} satisfies Meta<typeof ThemeProvider>;

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
      'red-500': '#B0B',
      'red-600': '#B7B',
    },
  },
  render: function StoryComponent(args: ComponentProps<typeof ThemeProvider>) {
    return (
      <div className="flex flex-col space-y-2">
        <Typography.Subtitle>Defaults:</Typography.Subtitle>
        {colors}
        <Typography.Subtitle>Override example:</Typography.Subtitle>
        <ThemeProvider {...args}>
          {colors}
        </ThemeProvider>
      </div>
    );
  }
};
