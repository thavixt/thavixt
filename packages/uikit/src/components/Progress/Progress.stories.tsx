import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { ComponentProps, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { ButtonBar } from '../ButtonBar/ButtonBar';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    current: 15,
    label: 'Downloading @thavixt/uikit from npm',
    max: 100,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Example: Story = {
  args: {
    inline: true,
    label: 'Progress',
  },
  render: function StoryComponent({ label, max = 100, ...args }: ComponentProps<typeof Progress>) {
    const [value, setValue] = useState(args.current);
    const [stopped, setStopped] = useState(true);
    useEffect(() => {
      if (stopped) {
        return;
      }
      const step = max / 100;
      const interval = setInterval(() => setValue(prev => {
        if (Math.random() < 0.3) {
          return prev;
        }
        const next = prev >= max ? 0 : prev + (Math.random() * 10 * step);
        return Math.min(+next.toFixed(2), max);
      }), 250);
      return () => clearInterval(interval);
    }, [max, stopped]);
    return (
      <div className='flex space-x-8 align-center'>
        <ButtonBar>
          <Button variant='silent' onClick={() => setValue(0)}>Reset</Button>
          <Button variant={stopped ? 'primary' : 'danger'} onClick={() => setStopped(prev => !prev)}>
            {stopped ? 'Start' : 'Stop'}
          </Button>
        </ButtonBar>
        <Progress {...args} label={label} max={max} current={value} />
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => (
    <div className='flex flex-col space-y-1'>
      <Progress max={100} current={0} />
      <Progress max={100} current={100 * 0.05} />
      <Progress max={100} current={100 * 0.10} />
      <Progress max={100} current={100 * 0.15} />
      <Progress max={100} current={100 * 0.20} />
      <Progress max={100} current={100 * 0.25} />
      <Progress max={100} current={100 * 0.30} />
      <Progress max={100} current={100 * 0.35} />
      <Progress max={100} current={100 * 0.40} />
      <Progress max={100} current={100 * 0.44} />
      <Progress max={100} current={100 * 0.50} />
      <Progress max={100} current={100 * 0.55} />
      <Progress max={100} current={100 * 0.60} />
      <Progress max={100} current={100 * 0.65} />
      <Progress max={100} current={100 * 0.70} />
      <Progress max={100} current={100 * 0.75} />
      <Progress max={100} current={100 * 0.80} />
      <Progress max={100} current={100 * 0.85} />
      <Progress max={100} current={100 * 0.90} />
      <Progress max={100} current={100 * 0.95} />
      <Progress max={100} current={100} />
    </div>
  )
};
