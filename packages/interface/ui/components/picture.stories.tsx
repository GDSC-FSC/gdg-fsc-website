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
import { Picture } from './picture';

const meta: Meta<typeof Picture> = {
  title: 'UI/Picture',
  component: Picture,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['responsive', 'fixed', 'cover', 'contain', 'thumbnail', 'avatar', 'hero', 'card'],
      description: 'The display variant of the picture',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius of the image',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow depth of the image',
    },
    transition: {
      control: 'select',
      options: ['none', 'hover', 'zoom', 'fade'],
      description: 'Hover transition effect',
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading strategy',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://picsum.photos/400/300';
const avatarImage = 'https://picsum.photos/100/100';

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'Sample image',
    variant: 'responsive',
  },
};

export const Thumbnail: Story = {
  args: {
    src: avatarImage,
    alt: 'Thumbnail image',
    variant: 'thumbnail',
  },
};

export const Avatar: Story = {
  args: {
    src: avatarImage,
    alt: 'User avatar',
    variant: 'avatar',
  },
};

export const Card: Story = {
  args: {
    src: sampleImage,
    alt: 'Card image',
    variant: 'card',
  },
};

export const Rounded: Story = {
  args: {
    src: sampleImage,
    alt: 'Rounded image',
    rounded: 'lg',
  },
};

export const WithShadow: Story = {
  args: {
    src: sampleImage,
    alt: 'Image with shadow',
    shadow: 'lg',
    rounded: 'md',
  },
};

export const WithHoverEffect: Story = {
  args: {
    src: sampleImage,
    alt: 'Image with hover effect',
    transition: 'zoom',
    rounded: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '800px' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Thumbnail</p>
        <Picture src={avatarImage} alt="Thumbnail" variant="thumbnail" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Avatar</p>
        <Picture src={avatarImage} alt="Avatar" variant="avatar" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Card</p>
        <Picture src={sampleImage} alt="Card" variant="card" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Rounded LG</p>
        <Picture src={sampleImage} alt="Rounded" rounded="lg" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>With Shadow</p>
        <Picture src={sampleImage} alt="Shadow" shadow="lg" rounded="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Zoom Hover</p>
        <Picture src={sampleImage} alt="Hover" transition="zoom" rounded="md" />
      </div>
    </div>
  ),
};
