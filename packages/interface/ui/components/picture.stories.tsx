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
import { Text } from './text';

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
const landscapeImage = 'https://picsum.photos/800/400';

// ============================================================================
// Basic Variants
// ============================================================================

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'Sample image',
    variant: 'responsive',
    className: 'max-w-md',
  },
};

export const Avatar: Story = {
  args: {
    src: avatarImage,
    alt: 'User avatar',
    variant: 'avatar',
  },
};

export const Thumbnail: Story = {
  args: {
    src: avatarImage,
    alt: 'Thumbnail image',
    variant: 'thumbnail',
  },
};

export const CardImage: Story = {
  args: {
    src: sampleImage,
    alt: 'Card image',
    variant: 'card',
    className: 'max-w-sm',
  },
};

// ============================================================================
// Styling Options
// ============================================================================

export const RoundedCorners: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Small Radius"
          rounded="sm"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Small (sm)
        </Text>
      </div>
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Medium Radius"
          rounded="md"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Medium (md)
        </Text>
      </div>
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Large Radius"
          rounded="lg"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Large (lg)
        </Text>
      </div>
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Full Radius"
          rounded="full"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Full
        </Text>
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="flex gap-6 items-center p-4">
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="No Shadow"
          shadow="none"
          rounded="md"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          None
        </Text>
      </div>
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Small Shadow"
          shadow="sm"
          rounded="md"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Small
        </Text>
      </div>
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Medium Shadow"
          shadow="md"
          rounded="md"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Medium
        </Text>
      </div>
      <div className="text-center">
        <Picture
          src={avatarImage}
          alt="Large Shadow"
          shadow="lg"
          rounded="md"
          className="w-24 h-24 object-cover"
        />
        <Text size="xs" color="muted" className="mt-2">
          Large
        </Text>
      </div>
    </div>
  ),
};

export const Transitions: Story = {
  render: () => (
    <div className="flex gap-6 items-center p-4">
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Picture
            src={sampleImage}
            alt="Hover Scale"
            transition="hover"
            className="w-48 h-32 object-cover"
          />
        </div>
        <Text size="xs" color="muted" className="mt-2">
          Hover Scale
        </Text>
      </div>
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Picture
            src={sampleImage}
            alt="Zoom Effect"
            transition="zoom"
            className="w-48 h-32 object-cover"
          />
        </div>
        <Text size="xs" color="muted" className="mt-2">
          Zoom Effect
        </Text>
      </div>
      <div className="text-center">
        <div className="overflow-hidden rounded-lg">
          <Picture
            src={sampleImage}
            alt="Fade Effect"
            transition="fade"
            className="w-48 h-32 object-cover"
          />
        </div>
        <Text size="xs" color="muted" className="mt-2">
          Fade Opacity
        </Text>
      </div>
    </div>
  ),
};

// ============================================================================
// Real-World Examples
// ============================================================================

export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm border border-border max-w-sm">
      <Picture
        src={avatarImage}
        alt="Profile"
        variant="avatar"
        className="border-2 border-background shadow-sm"
      />
      <div>
        <Text weight="semibold">Sarah Connor</Text>
        <Text size="sm" color="muted">
          Software Engineer
        </Text>
      </div>
    </div>
  ),
};

export const ArticleCard: Story = {
  render: () => (
    <div className="max-w-sm bg-card rounded-xl shadow-md border border-border overflow-hidden">
      <Picture src={sampleImage} alt="Article Cover" variant="card" transition="zoom" />
      <div className="p-4">
        <Text variant="small" color="primary" weight="semibold" className="mb-2 block">
          TECHNOLOGY
        </Text>
        <Text variant="heading" size="lg" className="mb-2">
          The Future of Web Development
        </Text>
        <Text variant="body" size="sm" color="muted">
          Explore the latest trends and technologies shaping the digital landscape in 2025.
        </Text>
      </div>
    </div>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="overflow-hidden rounded-lg shadow-sm">
          <Picture
            src={`https://picsum.photos/300/300?random=${i}`}
            alt={`Gallery image ${i}`}
            className="w-full h-full object-cover aspect-square"
            transition="zoom"
          />
        </div>
      ))}
    </div>
  ),
};

export const HeroSection: Story = {
  render: () => (
    <div className="relative w-full max-w-3xl rounded-xl overflow-hidden">
      <Picture src={landscapeImage} alt="Hero Background" variant="hero" className="h-64 md:h-80" />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
        <Text variant="heading" size="3xl" className="text-white mb-2">
          Welcome to GDG
        </Text>
        <Text variant="body" size="lg" className="text-white/90 max-w-lg">
          Building the future of technology together with our community.
        </Text>
      </div>
    </div>
  ),
};
