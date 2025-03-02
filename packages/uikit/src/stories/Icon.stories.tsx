import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../components/Icon';
import { ComponentProps } from 'react';
import { IconList, IconType } from '../components/IconList';

const meta = {
  title: 'Illustration/Icon',
  component: Icon,
  tags: ['autodocs'],
  render: function StoryComponent(args: ComponentProps<typeof Icon>) {
    return (
      <>
        <table className="table-auto border-collapse text-slate-800 dark:text-slate-100">
          <tbody>
            {Object.keys(IconList).sort().map((key) => (
              <tr>
                <td className='p-2 border border-slate-200 dark:border-slate-500'>
                  <code>{key}</code>
                </td>
                <td className='p-2 border border-slate-200 dark:border-slate-500'>
                  <Icon {...args} icon={key as IconType} />
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
    height: 8,
    icon: 'ArrowDown'
  }
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
