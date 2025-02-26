import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TextInput } from '../Input/TextInput';
import { Form } from '../Input/Form';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  // render: function StoryComponent(args: ComponentProps<typeof Tabs>) {
  //   const ref = useRef<TabsHandle>(null);
  //   return (
  //     <div className="flex flex-col space-y-8">
  //       <Tabs {...args} ref={ref}/>
  //       <div className="flex space-x-4">
  //         <Button onClick={() => ref.current?.prevTab()}>prev tab</Button>
  //         <Button onClick={() => ref.current?.nextTab()}>next tab</Button>
  //       </div>
  //     </div>
  //   )
  // },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const placeholder = "type something and go back to the previous tab";
export const Default: Story = {
  args: {
    children: [
      <p>asd</p>,
      <Tabs.Tab title='First tab'>
        <p>content of the first tab</p>
        <p>anything could go here...</p>
      </Tabs.Tab>,
      <Tabs.Tab title="Second tab that has a much longer title">
        <p>so I guess you've already read the first tab?</p>
      </Tabs.Tab>,
      <Tabs.Tab title='Tab with a form'>
        <Form>
          <TextInput label='Title' placeholder={placeholder} />
          <TextInput label='Subject' placeholder={placeholder} />
          <TextInput label='Description' placeholder={placeholder} />
          <TextInput label='Thoughts' placeholder={placeholder} />
        </Form>
      </Tabs.Tab>
    ]
  }
};
