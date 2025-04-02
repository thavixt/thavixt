import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from './FileInput';
import { fn } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Input/File input',
  component: FileInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '`<FileInput>` allows to drop files in the target area, preview selected files and process them with the `onAction` callback.',
      },
    },
  },
  args: {
    accept: 'image/*',
    action: "Upload cat memes",
    disabled: false,
    label: 'Click to select or drop your best cat memes here',
    multiple: true,
    onAction: fn(async (files) => {
      console.log('Processing files ...', files);
      await sleep(5000);
      console.log('File processing done.');
    }),
  },
} satisfies Meta<typeof FileInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
