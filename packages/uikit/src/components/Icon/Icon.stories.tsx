import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { ComponentProps } from 'react';
import { IconList, IconType } from '../Icon/IconList';

const meta = {
  title: 'Illustration/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    // className: 'text-indigo-500 dark:text-blue-500',
    height: 3,
    icon: 'Arrow'
  }
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Icon>) {
    return (
      <>
        <table className="table-auto border-collapse text-slate-800 dark:text-slate-100">
          <tbody>
            {Object.keys(IconList).sort().map((key) => (
              <tr key={key}>
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
};
