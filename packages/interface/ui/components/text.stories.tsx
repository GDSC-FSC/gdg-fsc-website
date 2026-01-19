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
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' },
      ],
    },
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
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'The size of the text',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight',
    },
    color: {
      control: 'select',
      options: ['foreground', 'primary', 'secondary', 'muted', 'accent', 'destructive'],
      description: 'The text color',
    },
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

// ============================================================================
// Basic Variants
// ============================================================================

export const Default: Story = {
  args: {
    children: 'This is default body text with relaxed line height for comfortable reading.',
    variant: 'body',
  },
};

export const Heading: Story = {
  args: {
    children: 'Bold Heading with Tight Tracking',
    variant: 'heading',
    size: '2xl',
    component: 'h1',
  },
};

export const Caption: Story = {
  args: {
    children: 'This is a caption - smaller and muted for supporting content',
    variant: 'caption',
  },
};

export const Small: Story = {
  args: {
    children: 'Extra small text for fine print and labels',
    variant: 'small',
  },
};

// ============================================================================
// Size Showcase
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <Text size="xs" className="border-l-2 border-muted pl-3">
        Extra Small (xs) - 12px
      </Text>
      <Text size="sm" className="border-l-2 border-muted pl-3">
        Small (sm) - 14px
      </Text>
      <Text size="md" className="border-l-2 border-muted pl-3">
        Medium (md) - 16px - Default
      </Text>
      <Text size="lg" className="border-l-2 border-muted pl-3">
        Large (lg) - 18px
      </Text>
      <Text size="xl" className="border-l-2 border-muted pl-3">
        Extra Large (xl) - 20px
      </Text>
      <Text size="2xl" className="border-l-2 border-primary pl-3">
        2X Large (2xl) - 24px
      </Text>
      <Text size="3xl" className="border-l-2 border-primary pl-3">
        3X Large (3xl) - 30px
      </Text>
      <Text size="4xl" className="border-l-2 border-primary pl-3">
        4X Large (4xl) - 36px
      </Text>
    </div>
  ),
};

// ============================================================================
// Weight Showcase
// ============================================================================

export const AllWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <Text weight="normal" size="lg">
        Normal weight (400) - Regular paragraph text
      </Text>
      <Text weight="medium" size="lg">
        Medium weight (500) - Slightly emphasized
      </Text>
      <Text weight="semibold" size="lg">
        Semibold weight (600) - Subheadings
      </Text>
      <Text weight="bold" size="lg">
        Bold weight (700) - Headings and emphasis
      </Text>
    </div>
  ),
};

// ============================================================================
// Color Showcase
// ============================================================================

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-background rounded-lg">
      <Text color="foreground" size="lg">
        Foreground - Default text color
      </Text>
      <Text color="primary" size="lg">
        Primary - Brand/accent color
      </Text>
      <Text color="secondary" size="lg">
        Secondary - Secondary text
      </Text>
      <Text color="muted" size="lg">
        Muted - Subdued, less important
      </Text>
      <Text color="accent" size="lg">
        Accent - Highlighted content
      </Text>
      <Text color="destructive" size="lg">
        Destructive - Errors and warnings
      </Text>
    </div>
  ),
};

// ============================================================================
// Typography Hierarchy
// ============================================================================

export const HeadingHierarchy: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-2xl">
      <Text component="h1" variant="heading" size="4xl">
        Page Title (H1)
      </Text>
      <Text component="h2" variant="heading" size="3xl">
        Section Heading (H2)
      </Text>
      <Text component="h3" variant="heading" size="2xl">
        Subsection Heading (H3)
      </Text>
      <Text component="h4" variant="heading" size="xl" weight="semibold">
        Card Title (H4)
      </Text>
      <Text variant="body" size="md">
        Body text with comfortable reading experience. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
      </Text>
      <Text variant="caption" color="muted">
        Caption: Posted on January 13, 2025 • 5 min read
      </Text>
    </div>
  ),
};

// ============================================================================
// Real-World Examples
// ============================================================================

export const ArticlePreview: Story = {
  render: () => (
    <article className="max-w-md p-6 bg-card rounded-xl shadow-lg border border-border">
      <Text component="h2" variant="heading" size="xl" className="mb-2">
        Introducing Our New Design System
      </Text>
      <Text variant="caption" color="muted" className="mb-4">
        By Mike Odnis • December 2024
      </Text>
      <Text variant="body" className="mb-4">
        We've completely redesigned our component library with accessibility and developer
        experience in mind. The new Text component supports multiple variants, sizes, and semantic
        HTML elements.
      </Text>
      <Text color="primary" weight="semibold" className="cursor-pointer hover:underline">
        Read more →
      </Text>
    </article>
  ),
};

export const ErrorMessage: Story = {
  render: () => (
    <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg max-w-md">
      <span className="text-destructive text-xl">⚠</span>
      <div>
        <Text color="destructive" weight="semibold" size="sm">
          Validation Error
        </Text>
        <Text color="muted" size="sm" className="mt-1">
          Please enter a valid email address to continue.
        </Text>
      </div>
    </div>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <div className="p-6 bg-card rounded-xl shadow-lg border border-border text-center max-w-xs">
      <Text color="muted" weight="medium" size="sm" className="uppercase tracking-widest">
        Pro Plan
      </Text>
      <div className="my-4">
        <Text component="span" size="4xl" weight="bold">
          $29
        </Text>
        <Text component="span" color="muted" size="sm">
          /month
        </Text>
      </div>
      <Text variant="body" color="muted" size="sm">
        Everything you need to build amazing products
      </Text>
    </div>
  ),
};

export const StatDisplay: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="text-center">
        <Text size="3xl" weight="bold" color="primary">
          2.5K
        </Text>
        <Text size="sm" color="muted">
          Active Users
        </Text>
      </div>
      <div className="text-center">
        <Text size="3xl" weight="bold" color="primary">
          98%
        </Text>
        <Text size="sm" color="muted">
          Satisfaction
        </Text>
      </div>
      <div className="text-center">
        <Text size="3xl" weight="bold" color="primary">
          150+
        </Text>
        <Text size="sm" color="muted">
          Components
        </Text>
      </div>
    </div>
  ),
};
