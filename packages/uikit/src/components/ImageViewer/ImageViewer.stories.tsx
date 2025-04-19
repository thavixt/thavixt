import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from './ImageViewer';
import { userEvent, within, expect, fn } from '@storybook/test';
import { sleep } from '../../common/utils';

const meta = {
  title: 'Layout/Image viewer',
  component: ImageViewer,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    width: 500,
    height: 500,
    title: "Random pictures from picsum.photos",
    src: [
      {
        src: "https://picsum.photos/id/237/1200/600",
        description: "1200x600 image", 
      },
      "https://picsum.photos/id/231/900/600",
      {
        src: "https://picsum.photos/id/239/1200/780",
        description: "1200x780 image"
      },
      "https://picsum.photos/id/240/1000/500",
      {
        src: "https://picsum.photos/id/242/1000/600",
        description: "1000x600 image"
      },
    ],
  }
} satisfies Meta<typeof ImageViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('ImageViewer')).toBeVisible();
    expect(canvas.queryByTestId('ImageViewerDialog')).not.toBeInTheDocument();
    await sleep(250);
    expect(canvas.getByTestId('ImageViewerImage0')).toBeVisible();
    expect(canvas.queryByTestId('ImageViewerImage1')).not.toBeInTheDocument();
    userEvent.click(canvas.getByTestId('ImageViewerNextButton'));
    await sleep(250);
    expect(canvas.queryByTestId('ImageViewerImage0')).not.toBeInTheDocument();
    expect(canvas.getByTestId('ImageViewerImage1')).toBeVisible();
    userEvent.click(canvas.getByTestId('ImageViewerPrevButton'));
    await sleep(250);
    expect(canvas.getByTestId('ImageViewerImage0')).toBeVisible();
    expect(canvas.queryByTestId('ImageViewerImage1')).not.toBeInTheDocument();
    await sleep(250);
  },
};

export const Dialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    userEvent.click(canvas.getByTestId('ImageViewerImage0'));
    await sleep(250);
    expect(canvas.queryByTestId('ImageViewerDialog')).toBeVisible();
    expect(canvas.getByTestId('ImageViewerDialogImage0')).toBeVisible();
    expect(canvas.queryByTestId('ImageViewerDialogImage1')).not.toBeInTheDocument();
    userEvent.click(canvas.getByTestId('ImageViewerDialogNextButton'));
    await sleep(250);
    expect(canvas.queryByTestId('ImageViewerDialogImage0')).not.toBeInTheDocument();
    expect(canvas.getByTestId('ImageViewerImage1')).toBeVisible();
    userEvent.click(canvas.getByTestId('ImageViewerDialogPrevButton'));
    await sleep(250);
    expect(canvas.getByTestId('ImageViewerDialogImage0')).toBeVisible();
    expect(canvas.queryByTestId('ImageViewerImage1')).not.toBeInTheDocument();
    userEvent.click(canvas.getByTestId('DialogCloseButton'));
    await sleep(250);
    userEvent.click(canvas.getByTestId('ImageViewerImage0'));
    await sleep(250);
  },
};