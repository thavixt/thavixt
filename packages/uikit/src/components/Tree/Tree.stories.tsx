import type { Meta, StoryObj } from '@storybook/react';
import { Tree, TreeHandle } from '../Tree/Tree';
import { fn } from '@storybook/test';
import { ComponentProps, useRef, useState } from 'react';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/Tree',
  component: Tree,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    className: '',
    defaultOpen: false,
    items: [
      {
        key: 'first',
        label: 'First item',
      },
      {
        key: 'second',
        label: 'Second item',
        children: [
          {
            key: 'first-nested',
            label: 'First nested',
          },
          {
            key: 'second-nested',
            label: 'Second nested',
            children: [
              {
                key: 'first-deeply-nested',
                label: 'First deeply nested',
              },
              {
                key: 'second-deeply-nested',
                label: 'Second deeply nested',
              },
              {
                key: 'third-deeply-nested',
                label: 'Third deeply nested',
              },
            ]
          },
          {
            key: 'third-nested',
            label: 'Third nested',
          },
        ]
      },
      {
        key: 'third',
        label: 'Third item',
      },
    ],
  }

} satisfies Meta<typeof Tree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CollapseAll: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Tree>) {
    const ref = useRef<TreeHandle>(null);
    const [lastClicked, setLastClicked] = useState('-');
    const onClick = (key: string) => {
      args.onClick?.(key);
      setLastClicked(key);
    }
    return (
      <div className="grid grid-cols-[300px_auto] space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button onClick={() => ref.current?.open()}>Open all</Button>
            <Button onClick={() => ref.current?.collapse()}>Collapse all</Button>
          </div>
          <p className='text-slate-600 dark:text-slate-200 flex space-x-2'>
            <span>last clicked:</span><code >{lastClicked}</code>
          </p>
        </div>
        <Tree {...args} ref={ref} onClick={onClick} />
      </div>
    );
  },
};
