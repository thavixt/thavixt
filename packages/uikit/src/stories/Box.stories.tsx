import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../components/Box';
import { Typography as T } from '../components/Typography';
import { ComponentProps } from 'react';
import { Form } from '../components/Form';
import { TextInput } from '../components/TextInput';
import { RadioInput } from '../components/RadioInput';
import { NumberInput } from '../components/NumberInput';
import { SwitchInput } from '../components/SwitchInput';
import { onSubmit } from './utils';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
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
          <Form border onSubmit={onSubmit}>
            <TextInput required label="Name" name='other' placeholder="Your pet's name" />
            <NumberInput required defaultValue={2} label='Age' name='age' placeholder='#' />
            <RadioInput required defaultValue='Cat' label='Species' name='species' values={['Cat', 'Dog']} />
            <SwitchInput required defaultChecked={true} label='Chipped' name='chipped' />
          </Form>
        </Box.Content>
      </Box>
    )
  },
  args: {
    type: 'card',
    size: 'sm',
  }
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

