import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { fn } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Input/File upload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    accept: "",
    disabled: false,
    multiple: false,
    onAction: fn(async (files) => {
      console.log('Uploading files ...', files);
      await sleep(5000);
      console.log('Upload finished');
    }),
    action: "Upload files"
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
