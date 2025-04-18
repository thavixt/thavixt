import type { Meta, StoryObj } from '@storybook/react';
import { RangeInput } from './RangeInput';
import { fn } from '@storybook/test';
import { Icon } from '../Icon/Icon';
import { ReactElement, useRef, useState } from 'react';
import { Button } from '../Button/Button';

const meta = {
  title: 'Input/Range input',
  component: RangeInput,
  tags: ['autodocs'],
} satisfies Meta<typeof RangeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 3,
    max: 10,
    name: 'number',
    label: 'Set a number',
    onChange: fn(),
  }
};

export const ExampleVolumeKnob: Story = {
  args: {
    className: 'accent-orange-600',
    defaultValue: 50,
    step: 5,
    name: 'volume',
    onChange: fn(),
    transformValue: (v, _, max) => getPercentageBetween(v, max),
    before: (transformedValue) => getAfterIcon(transformedValue),
  },
};

// @ts-expect-error meh, this is just a custom component showcase, cant do args
export const CustomMusicPlayer: Story = {
  render: function StoryComponent() {
    const ref = useRef<HTMLAudioElement>(null);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const [max, setMax] = useState(0);
    const [title, setTitle] = useState('Loading ...');
    const [loading, setLoading] = useState(true);

    const play = () => {
      if (!ref.current) {
        return;
      }
      setPaused(false);
      ref.current.play();
    }
    const pause = () => {
      if (!ref.current) {
        return;
      }
      setPaused(true);
      ref.current.pause();
    }

    const onTimeUpdate: React.ReactEventHandler<HTMLAudioElement> = (e) => {
      setCurrentTime(Math.round(e.currentTarget.currentTime));
    }
    const onLoadedMetadata: React.ReactEventHandler<HTMLAudioElement> = (e) => {
      setTitle(e.currentTarget.src);
      setMax(e.currentTarget.duration);
      setVolume(e.currentTarget.volume * 100);
      setLoading(false);
    }

    const onChange = (v: number) => {
      setCurrentTime(v);
      if (ref.current) {
        ref.current.currentTime = v;
      }
    }

    const setVolume = (v: number) => {
      setCurrentVolume(v);
      if (ref.current) {
        ref.current.volume = v / 100;
      }
    }

    return (
      <div className='bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg p-2 w-fit'>
        <audio
          aria-disabled
          aria-hidden
          aria-readonly
          hidden
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          ref={ref}
          src="https://cdn.freesound.org/previews/12/12691_32572-lq.mp3"
        />
        <div className="flex space-x-2 max-w-[300px] items-center">
          <Button
            disabled={loading}
            className='bg-slate-100 dark:bg-slate-500 hover:bg-slate-200 hover:dark:bg-slate-600 text-slate-800 dark:text-slate-200'
            onClick={() => paused ? play() : pause()}
            title={paused ? 'Play' : 'Pause'}
          >
            <Icon height={3} type={paused ? 'Play' : 'Pause'} />
          </Button>
          <div className="flex flex-col">
            <small title={title} className='truncate w-[160px] text-slate-600 dark:text-slate-400'>{title}</small>
            <RangeInput
              disabled={loading}
              max={max}
              min={0}
              name='seek'
              onChange={onChange}
              transformValue={(v) => `${Math.floor(v / 60)}:${`${v % 60}`.padStart(2, '0')}`}
              value={currentTime}
            />
          </div>
          <div className="flex items-center group">
            <div className='flex items-center' title='Set volume'>{getAfterIcon(currentVolume)}</div>
            <div className='hidden group-hover:flex items-center'>
              <RangeInput
                disabled={loading}
                className='-rotate-z-90 w-10'
                max={100}
                min={0}
                name='volume'
                onChange={setVolume}
                showValue={false}
                value={currentVolume}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
};

function getPercentageBetween(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

function getAfterIcon(transformedValue: string | number): ReactElement {
  const value = parseInt(transformedValue.toString());
  if (value === 0) {
    return <Icon height={3} type='Volume0' />;
  }
  if (value < 60) {
    return <Icon height={3} type='Volume1' />;
  }
  return <Icon height={3} type='Volume2' />;
} 