/**
 * Copyright 2025 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['heading', 'body', 'caption', 'small'],
      description: 'The semantic variant of the text',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the text',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent'],
      description: 'The text color',
    },
    // The 'component' prop exists on Text but is omitted from one of its overloads,
    // causing Storybook's inferred ArgTypes to exclude it. We assert to include it.
    component: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The HTML element to render',
    },
  } as Meta<typeof Text>['argTypes'],
};

export default meta;
type Story = StoryObj<typeof meta> & {
  args?: { component?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };
};

export const Default: Story = {
  args: {
    children: 'This is default body text.',
    variant: 'body',
  },
};

export const Heading: Story = {
  args: {
    children: 'This is a heading',
    variant: 'heading',
    component: 'h1',
  },
};

export const Caption: Story = {
  args: {
    children: 'This is a caption',
    variant: 'caption',
  },
};

export const Small: Story = {
  args: {
    children: 'This is small text',
    variant: 'small',
  },
};

export const Bold: Story = {
  args: {
    children: 'This is bold text',
    weight: 'bold',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary colored text',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary colored text',
    color: 'secondary',
  },
};

export const Muted: Story = {
  args: {
    children: 'Muted colored text',
    color: 'muted',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent colored text',
    color: 'accent',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
      <Text size="2xl">2X Large (2xl)</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text color="primary">Primary color</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="accent">Accent color</Text>
    </div>
  ),
};

export const HeadingHierarchy: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text component="h1" variant="heading" size="2xl" weight="bold">Heading 1</Text>
      <Text component="h2" variant="heading" size="xl" weight="bold">Heading 2</Text>
      <Text component="h3" variant="heading" size="lg" weight="semibold">Heading 3</Text>
      <Text component="h4" variant="heading" size="md" weight="semibold">Heading 4</Text>
      <Text component="p" variant="body">Body paragraph text</Text>
      <Text variant="caption" color="muted">Caption text</Text>
    </div>
  ),
};
