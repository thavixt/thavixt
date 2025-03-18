import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { ComponentProps, useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { ButtonBar } from '../Button/ButtonBar';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    current: 25,
    label: 'Downloading @thavixt/uikit from npm',
    max: 100,
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
        const next = prev >= max ? 0 : prev + step;
        return Math.min(+next.toFixed(2), max);
      }), 100);
      return () => clearInterval(interval);
    }, [max, stopped]);
    return (
      <div className='flex flex-col space-y-2'>
        <Progress {...args} label={label} max={max} current={max} />
        <Progress {...args} max={max} current={max * 0.75} />
        <Progress {...args} max={max} current={max * 0.5} />
        <Progress {...args} max={max} current={max * 0.25} />
        <Progress {...args} max={max} current={0} />
        <Progress {...args} max={max} current={value} />
        <Progress {...args} max={max} current={value / 7} />
        <ButtonBar>
          <Button onClick={() => setValue(0)}>Reset</Button>
          <Button onClick={() => setStopped(prev => !prev)}>Start / Stop</Button>
        </ButtonBar>
      </div>
    );
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
