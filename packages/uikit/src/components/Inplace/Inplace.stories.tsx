import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Inplace } from './Inplace';
import { TextInput } from '../TextInput/TextInput';
import { ComponentProps, useRef, useState } from 'react';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Utility/Inplace',
  component: Inplace,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: "`<Inplace>` is used to replace the content of an element on click.",
      },
    },
  },
  args: {
    onReplace: fn(),
    children: 'Click to replace me',
    replacement: <TextInput name='story' defaultValue='story' />,
  },
} satisfies Meta<typeof Inplace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Inplace>) {
    const [value, setValue] = useState('Click me!!44!!!!4!');
    const ref = useRef<HTMLInputElement>(null);
    const onReplace = (replaced: boolean) => {
      if (ref.current) {
        setValue(ref.current.value);
      }
      args.onReplace?.(replaced);
    };

    return (
      <div className="inline">
        <Typography.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis eum quas voluptatem soluta, necessitatibus possimus reprehenderit enim totam consequuntur ipsa sapiente, dicta asperiores! Maiores quae quidem ut iusto ullam explicabo.
        </Typography.Text>
        <Inplace onReplace={onReplace} replacement={<TextInput ref={ref} silent name='example' defaultValue={value} onEnter={v => setValue(v)} />}>
          {value}
        </Inplace>
        <Typography.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique odit incidunt iusto sint error impedit itaque alias nobis nesciunt facilis, repellat sunt quaerat odio, ratione voluptatum provident temporibus fuga ad.
        </Typography.Text>
      </div>
    )
  },
};
