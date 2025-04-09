import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Typography } from '../Typography/Typography';
import { ComponentProps } from 'react';

const meta = {
  title: 'Basic/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Allows you to toggle the `data-theme` attribute of the `<html>` of the current page between `light` and `dark`. Most components in *@thavixt/uikit* work with this type of themeing.'
      }
    }
  },
  args: {
    position: 'inline',
  },
  render: function StoryComponent(args: ComponentProps<typeof ThemeSwitcher>) {
    return (
      <div>
        <ThemeSwitcher {...args} />
        <div className="flex flex-col py-8 px-16">
          <Typography.Title>Title of this amazing article</Typography.Title>
          <Typography.Body>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste repellendus nemo sed aut temporibus. Tenetur quasi commodi eum vero! Et in accusantium quasi excepturi sint odit assumenda iure distinctio reiciendis earum veniam, officia voluptatem nemo aperiam reprehenderit fugiat ad veritatis porro ab culpa deleniti ipsa fuga illum. Magni magnam error obcaecati cum excepturi a. Natus quibusdam sed provident enim, ex earum odio vel nobis, dignissimos reprehenderit voluptatibus sequi nostrum minus et neque, doloribus consectetur quasi quo quos iusto nesciunt voluptate porro laudantium. Magnam harum, dolore corrupti nemo aperiam recusandae. Labore iure nam quaerat? Distinctio laudantium temporibus aspernatur earum iusto nesciunt?
          </Typography.Body>
        </div>
      </div>
    )
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
