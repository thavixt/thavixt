import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import { ComponentProps } from 'react';
import { LoaderList, LoaderType } from './LoaderList';
import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

const meta = {
  title: 'Illustration/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Animated SVGs suggesting that backdround tasks are in-progress, or some data is loading',
      },
    },
  },
  args: {
    // className: 'text-indigo-500 dark:text-blue-500',
    height: 8,
    type: 'TubeSpinner',
  }
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Loader>) {
    return (
      <div className="grid grid-cols-2 gap-x-16">
        {Object.keys(LoaderList).sort().map((key) => (
          <div className='p-2 flex gap-4 items-center' key={key}>
            <Loader {...args} type={key as LoaderType} />
            <CopyLoader type={key as LoaderType} />
          </div>
        ))}
      </div>
    )
  },
};

function CopyLoader({type}: {type: LoaderType}) {
  return (
    <CopyToClipboard transform={(text) => `<Loader type="${text}" />`}>
      {type}
    </CopyToClipboard>
  )
}
