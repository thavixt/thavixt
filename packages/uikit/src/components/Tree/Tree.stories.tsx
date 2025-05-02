import type { Meta, StoryObj } from '@storybook/react';
import { Tree, TreeHandle } from '../Tree/Tree';
import { ComponentProps, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { userEvent, fn, expect } from '@storybook/test';
import { sleep } from '../../common/utils';

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
        key: 'a0',
        label: 'First',
      },
      {
        key: 'a1',
        label: 'Second',
        children: [
          {
            key: 'b0',
            label: 'First nested',
          },
          {
            key: 'b1',
            label: 'Second nested',
            children: [
              {
                key: 'c0',
                label: 'First deeply nested',
              },
              {
                key: 'c1',
                label: 'Second deeply nested',
              },
              // {
              //   key: 'c2',
              //   label: 'Third deeply nested',
              //   children: [
              //     {
              //       key: 'd0',
              //       label: 'Third very deeply nested',
              //       children: [
              //         {
              //           key: 'e0',
              //           label: 'Third2 very deeply nested',
              //           children: [
              //             {
              //               key: 'f0',
              //               label: 'Third3 very deeply nested',
              //               children: [
              //                 {
              //                   key: 'g0',
              //                   label: 'Third4 very deeply nested',
              //                 },
              //                 {
              //                   key: 'g1',
              //                   label: 'Very deeply nested target',
              //                 }
              //               ]
              //             },
              //             {
              //               key: 'f1',
              //               label: 'Third very deeply nested',
              //             }
              //           ]
              //         },
              //         {
              //           key: 'e1',
              //           label: 'Third very deeply nested2',
              //         }
              //       ],
              //     },
              //     {
              //       key: 'd1',
              //       label: 'Third very deeply nested',
              //     }
              //   ]
              // },
            ]
          },
          {
            key: 'b2',
            label: 'Third nested',
          },
        ]
      },
      {
        key: 'a2',
        label: 'Third',
      },
    ],
  }

} satisfies Meta<typeof Tree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    expect(canvas.getByText('Second')).toBeVisible();
    userEvent.click(document.querySelector('#a1') as HTMLElement);
    await sleep(250);
    expect(canvas.getByText('Second nested')).toBeVisible();
    userEvent.click(document.querySelector('#b1') as HTMLElement);
    await sleep(250);
    expect(canvas.getByText('Second deeply nested')).toBeVisible();
    userEvent.click(document.querySelector('#a1') as HTMLElement);
    await sleep(250);
    expect(canvas.getByText('Second nested')).not.toBeVisible();
    expect(canvas.getByText('Second deeply nested')).not.toBeVisible();
    userEvent.click(document.querySelector('#a1') as HTMLElement);
    await sleep(250);
    expect(canvas.getByText('Second nested')).toBeVisible();
    expect(canvas.getByText('Second deeply nested')).toBeVisible();
  },
};

export const CollapseAll: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Tree>) {
    const ref = useRef<TreeHandle>(null);
    const [lastClicked, setLastClicked] = useState('-');
    const onClick = (key: string) => {
      args.onClick?.(key);
      setLastClicked(key);
    }
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Button id="openAll" onClick={() => ref.current?.open()}>Open all</Button>
            <Button id="collapseAll" onClick={() => ref.current?.collapse()}>Collapse all</Button>
          </div>
          <p className='text-slate-600 dark:text-slate-200 flex space-x-2'>
            <span>last clicked:</span><code >{lastClicked}</code>
          </p>
        </div>
        <Tree {...args} ref={ref} onClick={onClick} />
      </div>
    );
  },
  play: async ({ canvas }) => {
    userEvent.click(document.querySelector('#openAll') as HTMLElement);
    await sleep(500);
    expect(canvas.getByText('Second')).toBeVisible();
    expect(canvas.getByText('Second nested')).toBeVisible();
    expect(canvas.getByText('Second deeply nested')).toBeVisible();
    userEvent.click(document.querySelector('#collapseAll') as HTMLElement);
    await sleep(500);
    expect(canvas.getByText('Second')).toBeVisible();
    expect(canvas.queryByText('Second nested')).not.toBeVisible();
    expect(canvas.queryByText('Second deeply nested')).not.toBeVisible();
    userEvent.click(document.querySelector('#openAll') as HTMLElement);
    await sleep(500);
  },
};
