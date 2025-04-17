import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { fn } from '@storybook/test';
import { Button } from '../Button/Button';
import { userEvent, within, expect } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Basic/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The `<Popover>` component allows you to create nesting submenus and attach an `onClick` listener that identifies the last clicked menu item by the `id` prop of the <Popover.Item> element.'
      }
    }
  },
  args: {
    id: 'story',
  },
  decorators: [
    (Story) => (
      <div>
        <div data-testid="outsideClickTarget"></div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    target: "Click here for a dropdown menu",
    onClick: fn(),
    children: [
      <Popover.Item id="1">Option 1</Popover.Item>,
      <Popover.Item id="2">
        <Popover target="Option 2">
          <Popover.Item id="2-1">Nested option 1</Popover.Item>
          <Popover.Item id="2-2">Nested option 2</Popover.Item>
        </Popover>
      </Popover.Item>,
      <Popover.Item id="3">Option 3</Popover.Item>,
      <Popover.Item id="4">Option 4</Popover.Item>,
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('Popover-story'));
    await sleep(250);
    userEvent.click(canvas.queryByText('Option 2') as HTMLElement);
    await sleep(250);
    expect(canvas.queryByText('Nested option 2') as HTMLElement).toBeVisible();
    // clear
    await userEvent.click(canvas.getByTestId('Popover-story'));
    await userEvent.click(canvas.getByTestId('outsideClickTarget'));
    await sleep(250);
    expect(canvas.queryByText('Nested option 2') as HTMLElement).not.toBeVisible();
  },
};

export const NestedExample: Story = {
  args: {
    target: (
      <Button title='Change settings' variant='silent' icon={{ icon: "Gear" }} />
    ),
    onClick: fn(),
    children: [
      <Popover.Item id="1">Option 1</Popover.Item>,
      <Popover.Item id="2">
        <Popover target="Advanced options">
          <Popover.Item id="2-1">Option 1</Popover.Item>
          <Popover.Item id="2-2">Option 1</Popover.Item>
          <Popover.Item id="2-3">Option 1</Popover.Item>
          <Popover.Item id="2-4">Option 1</Popover.Item>
          <Popover.Item id="2-5">
            <Popover position='left' target="More to the bottom">
              <Popover.Item id="2-5-1">Option 1</Popover.Item>
              <Popover.Item id="2-5-2">Option 2</Popover.Item>
              <Popover.Item id="2-5-3">Option 3</Popover.Item>
              <Popover.Item id="2-5-4">Option 4</Popover.Item>
              <Popover.Item id="2-5-5">
                <Popover target="More to the left">
                  <Popover.Item id="2-5-5-1">Option 3</Popover.Item>
                  <Popover.Item id="2-5-5-2">Option 2</Popover.Item>
                  <Popover.Item id="2-5-5-3">
                    <Popover position='left' target="More to the top">
                      <Popover.Item id="2-5-5-3-1">Final option 1</Popover.Item>
                      <Popover.Item id="2-5-5-3-2">Final option 2</Popover.Item>
                      <Popover.Item id="2-5-5-3-3">Final option 3</Popover.Item>
                    </Popover>
                  </Popover.Item>
                </Popover>
              </Popover.Item>
            </Popover>
          </Popover.Item>
        </Popover>
      </Popover.Item>,
      <Popover.Item id="3">Option 3</Popover.Item>,
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('Popover-story'));
    await sleep(250);
    userEvent.click(canvas.queryByText('Advanced options') as HTMLElement);
    await sleep(250);
    userEvent.click(canvas.queryByText('More to the bottom') as HTMLElement);
    await sleep(250);
    userEvent.click(canvas.queryByText('More to the left') as HTMLElement);
    await sleep(250);
    userEvent.click(canvas.queryByText('More to the top') as HTMLElement);
    await sleep(250);
    userEvent.click(canvas.queryByText('Final option 3') as HTMLElement);
    await sleep(250);
    expect(canvas.queryByText('Final option 3') as HTMLElement).toBeVisible();
    // clear
    await userEvent.click(canvas.getByTestId('Popover-story'));
    await userEvent.click(canvas.getByTestId('outsideClickTarget'));
    await sleep(250);
    expect(canvas.queryByText('Final option 3') as HTMLElement).not.toBeVisible();
  },
};
