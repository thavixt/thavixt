import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { Typography } from '../Typography/Typography';
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
  argTypes: {
    type: {
      options: ['card', 'paper'],
      control: { type: 'radio' },
    },
  },
  render: function StoryComponent(args: ComponentProps<typeof Box>) {
    return (
      <Box {...args}>
        <Box.Content>
          <Typography type='text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
          </Typography>
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
          <Typography type='title'>Header</Typography>
        </Box.Header>
        <Box.Content>
          <Typography type='text'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, recusandae.
          </Typography>
        </Box.Content>
        <Box.Footer>
          <Typography type='text'>Footer1</Typography>
          <Typography type='text'>Footer2</Typography>
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
          <Typography type='title'>Registering your pet</Typography>
        </Box.Header>
        <Box.Content>
          <Typography type='caption'>
            Required by the government in your state.
          </Typography>
          <Typography type='body'>
            Please provide the needed information about your pet. This assumes you currently keep the aformentioned animal in your place of residence.
          </Typography>
          <Form onSubmit={onSubmit}>
            <TextInput inline required label="Name" name='other' placeholder="Your pet's name" />
            <NumberInput inline required defaultValue={2} label='Age' name='age' placeholder='#' />
            <RadioInput inline required defaultValue='Cat' label='Species' name='species' values={['Cat', 'Dog']} />
            <SwitchInput required defaultChecked={true} label='Chipped' name='chipped' />
          </Form>
        </Box.Content>
      </Box>
    )
  },
};

