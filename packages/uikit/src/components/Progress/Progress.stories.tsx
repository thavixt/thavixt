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
    current: 95,
    label: 'Progress:',
    max: 100,
    height: '20px',
    inline: false,
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    current: 15,
    inline: true,
    label: 'Progress:',
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
          <Button title='Reset' variant='silent' onClick={() => setValue(0)}>&#8635;</Button>
          <Button title={stopped ? 'Start' : 'Stop'} variant={stopped ? 'primary' : 'danger'} onClick={() => setStopped(prev => !prev)}>
            {stopped ? <span>&#11122;</span> : <span>&#10539;</span>}
          </Button>
        </ButtonBar>
        <Progress {...args} label={label} max={max} current={value} />
      </div>
    );
  },
};

// export const Default: Story = {
//   args: {
//     label: 'Downloading @thavixt/uikit from npm:',
//   },
// };

export const DefaultColors: Story = {
  args: {
    label: undefined,
  },
  render: StoryColorListComponent,
};

export const CustomColors: Story = {
  args: {
    label: undefined,
    getColorFromValue(value, max) {
      return `rgb(${200 - 200 * Math.fround(value/max)}, 0, ${200 * Math.fround(value/max)})`;
    },
  },
  render: StoryColorListComponent,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function StoryColorListComponent({ current, max, ...args }: ComponentProps<typeof Progress>) {
  return (
    <div className='flex flex-col space-y-1'>
      <Progress {...args} max={100} current={0} />
      <Progress {...args} max={100} current={100 * 0.05} />
      <Progress {...args} max={100} current={100 * 0.10} />
      <Progress {...args} max={100} current={100 * 0.15} />
      <Progress {...args} max={100} current={100 * 0.20} />
      <Progress {...args} max={100} current={100 * 0.25} />
      <Progress {...args} max={100} current={100 * 0.30} />
      <Progress {...args} max={100} current={100 * 0.35} />
      <Progress {...args} max={100} current={100 * 0.40} />
      <Progress {...args} max={100} current={100 * 0.44} />
      <Progress {...args} max={100} current={100 * 0.50} />
      <Progress {...args} max={100} current={100 * 0.55} />
      <Progress {...args} max={100} current={100 * 0.60} />
      <Progress {...args} max={100} current={100 * 0.65} />
      <Progress {...args} max={100} current={100 * 0.70} />
      <Progress {...args} max={100} current={100 * 0.75} />
      <Progress {...args} max={100} current={100 * 0.80} />
      <Progress {...args} max={100} current={100 * 0.85} />
      <Progress {...args} max={100} current={100 * 0.90} />
      <Progress {...args} max={100} current={100 * 0.95} />
      <Progress {...args} max={100} current={100} />
    </div>
  )
}