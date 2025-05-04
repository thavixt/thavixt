import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { ThemeOverride } from './ThemeOverride';
import { Typography } from '../Typography/Typography';
import { Button } from '../Button/Button';

const COLORS = [
  [
    'white',
    'black',
  ],
  [
    'gray',
    'gray-dark',
  ],
  [
    'slate',
    'slate-dark',
  ],
  [
    'lime',
    'green',
    'emerald',
    'teal',
  ],
  [
    'sky',
    'indigo',
    'blue',
    'violet',
  ],
  [
    'yellow',
    'orange',
    'red',
    'pink',
  ],
];

const CONTRAST_COLORS = [
  'white',
  'gray',
  'slate',
];

const PRIMARY_ACCENT_COLORS = [
  'emerald',
  'blue',
  'red',
];

const meta = {
  title: 'Basic/Theme override',
  component: ThemeOverride,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Override the default colors of `@thavixt/uikit`, by wrapping a subtree in a `<ThemeOverride>`, and providing a list of `colors`. Reference for the default colors can be found below.',
      },
    },
  },
  render: function StoryComponent(args: ComponentProps<typeof ThemeOverride>) {
    return (
      <div className="flex flex-col space-y-2">
        <Typography type="subtitle">Defaults - hover the colors to view the CSS class name:</Typography>
        <ThemeOverride {...args}>
          <div className='flex flex-col max-w-[400px]'>
            {COLORS.map(color => (
              <div className="grid grid-cols-4 h-8">
                {color.map(variant => (
                  <div
                    title={`color: var(--${variant})`}
                    style={{
                      backgroundColor: `var(--${variant})`,
                      color: CONTRAST_COLORS.includes(variant) ? 'black' : 'white',
                      textDecoration: PRIMARY_ACCENT_COLORS.includes(variant) ? 'underline' : 'none',
                    }}>
                    <span className='pl-1 text-xs'>{variant}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ThemeOverride>
      </div>
    );
  },
} satisfies Meta<typeof ThemeOverride>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Defaults: Story = {};

export const ColorOverrideExample: Story = {
  args: {
    colors: {
      'green': 'orange',
      'blue': '#66c',
      'red': 'rgb(255 102 102)',
    },
  },
  render: function StoryComponent(args: ComponentProps<typeof ThemeOverride>) {
    return (
      <div className="flex flex-col space-y-2">
        <Typography type="subtitle">Default button colors:</Typography>
          <div className="flex space-x-2">
            <Button variant='default'>Default button</Button>
            <Button variant='primary'>Primary button</Button>
            <Button variant='secondary'>Secondary button</Button>
            <Button variant='danger'>Danger button</Button>
          </div>
        <Typography type="subtitle">Color override example:</Typography>
        <ThemeOverride {...args}>
          <div className="flex space-x-2">
            <Button variant='default'>Default button</Button>
            <Button variant='primary'>Primary button</Button>
            <Button variant='secondary'>Secondary button</Button>
            <Button variant='danger'>Danger button</Button>
          </div>
        </ThemeOverride>
      </div>
    );
  }
};
