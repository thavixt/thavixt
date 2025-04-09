import type { Meta, StoryObj } from '@storybook/react';
import { ImageViewer } from './ImageViewer';
import { Typography } from '../Typography/Typography';
import { SkeletonListItem } from '../Skeleton/Skeleton';
import { fn } from '@storybook/test';

const meta = {
  title: 'Layout/Image viewer',
  component: ImageViewer,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    width: 500,
    height: 500,
    title: "Discussion about my photo gallery",
    src: [
      {
        src: "https://images.squarespace-cdn.com/content/v1/5cd57d59ca525b7e9eae595c/1559580050048-SR8UV1RAZ1D3HXKCF2Q0/Budapest+2018-06-28-004.jpg?format=2500w",
        description: "Example description here", 
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5cd57d59ca525b7e9eae595c/1559837452531-YUX6NAEA7X2HTD42CXD1/Budapest+2018-07-01-013.jpg?format=2500w",
        description: "Example description again"
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5cd57d59ca525b7e9eae595c/1559838072543-FYN9HZJR4LSIB03YPHOP/Budapest+2018-07-01-011.jpg?format=1500w",
        description: "Example description yet again"
      },
      {
        src: "https://images.squarespace-cdn.com/content/v1/5cd57d59ca525b7e9eae595c/1559838106459-OTR6920UHSDZGGPFLQBF/_MG_2630.jpg?format=2500w",
        description: "No more descriptions from here on :("
      },
      "https://images.squarespace-cdn.com/content/v1/5cd57d59ca525b7e9eae595c/1559838134110-IYGFV8DU15GA5JYWK8KG/_MG_2626.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/5cd57d59ca525b7e9eae595c/1559842290532-0UJVFJGXFOHJ8GBN38D8/Budapest+2018-06-29-013.jpg?format=2500w",
    ],
    sidebar: (index) => (
      <div className='flex flex-col space-y-4'>
        <div className='sticky top-0 left-0 bg-slate-100 dark:bg-gray-800 z-100'>
          <Typography.Body>
            Comments or notes about image #{index}
          </Typography.Body>
        </div>
        {new Array(Math.ceil(Math.random() * 10)).fill(null).map((_, i) => (
          <SkeletonListItem key={`${i}-${Math.random()}`}/>
        ))}
      </div>
    )
  }
} satisfies Meta<typeof ImageViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};