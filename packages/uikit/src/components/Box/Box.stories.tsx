import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { Typography as T } from '../Typography/Typography';
import { ComponentProps } from 'react';
import { Form } from '../Form/Form';
import { onSubmit } from '../utils';
import { NumberInput } from '../NumberInput/NumberInput';
import { RadioInput } from '../RadioInput/RadioInput';
import { SwitchInput } from '../SwitchInput/SwitchInput';
import { TextInput } from '../TextInput/TextInput';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    type: 'card',
    size: 'sm',
  },
  render: function StoryComponent(args: ComponentProps<typeof Box>) {
    return (
      <Box {...args}>
        <Box.Content>
          <T.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
          </T.Text>
        </Box.Content>
      </Box>
    )
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    type: 'card',
  },
};

export const Paper: Story = {
  args: {
    type: 'paper',
  },
};

export const Segmented: Story = {
  args: {
    type: 'paper',
  },
  render: function StoryComponent(args: ComponentProps<typeof Box>) {
    return (
      <Box {...args}>
        <Box.Header>
          <T.Title>Header</T.Title>
        </Box.Header>
        <Box.Content>
          <T.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
          </T.Text>
        </Box.Content>
        <Box.Footer>
          <T.Text>Footer1</T.Text>
          <T.Text>Footer2</T.Text>
        </Box.Footer>
      </Box>
    )
  },
};


export const Example: Story = {
  render: function StoryComponent(args: ComponentProps<typeof Box>) {
    return (
      <Box {...args}>
        <Box.Header>
          <T.Title>Registering your pet</T.Title>
        </Box.Header>
        <Box.Content>
          <T.Caption>
            Required by the government in your state.
          </T.Caption>
          <T.Body>
            Please provide the needed information about your pet. This assumes you currently keep the aformentioned animal in your place of residence.
          </T.Body>
          <Form onSubmit={onSubmit}>
            <TextInput required label="Name" name='other' placeholder="Your pet's name" />
            <NumberInput required defaultValue={2} label='Age' name='age' placeholder='#' />
            <RadioInput required defaultValue='Cat' label='Species' name='species' values={['Cat', 'Dog']} />
            <SwitchInput required defaultChecked={true} label='Chipped' name='chipped' />
          </Form>
        </Box.Content>
      </Box>
    )
  },
};

