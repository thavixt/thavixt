import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { ComponentProps } from 'react';
import { SpinnerList, SpinnerType } from './SpinnerList';

const meta = {
  title: 'Illustration/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Animated SVGs suggesting that backdround tasks are in-progress, or some data is loading',
      },
    },
  },
  render: function StoryComponent(args: ComponentProps<typeof Spinner>) {
    return (
      <>
        <table className="table-auto border-collapse text-slate-800 dark:text-slate-100">
          <tbody>
            {Object.keys(SpinnerList).sort().map((key) => (
              <tr>
                <td className='p-2 border border-slate-200 dark:border-slate-500'>
                  <code>{key}</code>
                </td>
                <td className='p-2 border border-slate-200 dark:border-slate-500'>
                  <Spinner {...args} type={key as SpinnerType} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
  args: {
    className: 'text-indigo-500 dark:text-green-400',
    height: 10,
  }
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
