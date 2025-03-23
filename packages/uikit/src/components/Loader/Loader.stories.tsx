import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import { ComponentProps } from 'react';
import { LoaderList, LoaderType } from './LoaderList';

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
    className: 'text-indigo-500 dark:text-blue-500',
    height: 8,
    type: 'TubeSpinner',
  }
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Loader>) {
    return (
      <>
        <table className="table-auto border-collapse text-slate-800 dark:text-slate-100">
          <tbody>
            {Object.keys(LoaderList).sort().map((key) => (
              <tr key={key}>
                <td className='p-2 border border-slate-200 dark:border-slate-500'>
                  <code>{key}</code>
                </td>
                <td className='p-2 border border-slate-200 dark:border-slate-500'>
                  <Loader {...args} type={key as LoaderType} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
};
