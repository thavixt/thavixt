import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon/Icon';
import { ComponentProps } from 'react';
import { IconList, IconType } from '../Icon/IconList';
import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

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

export const All: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Icon>) {
    return (
      <>
        <div className="grid grid-cols-2 gap-x-16">
          {Object.keys(IconList).sort().map((key) => (
            <div className='p-2 flex gap-4 items-center' key={key}>
              <Icon {...args} icon={key as IconType} />
              <CopyIcon type={key as IconType} />
            </div>
          ))}
        </div>
      </>
    )
  },
};

function CopyIcon({type}: {type: IconType}) {
  return (
    <CopyToClipboard transform={(text) => `<Icon type="${text}" />`}>
      {type}
    </CopyToClipboard>
  )
}

