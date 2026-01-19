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
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
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
      options: ['primary', 'secondary'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Variants
// ============================================================================

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// ============================================================================
// Sizes
// ============================================================================

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Default: Story = {
  args: {
    size: 'default',
    children: 'Default Size',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// ============================================================================
// States
// ============================================================================

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// ============================================================================
// Showcase Stories
// ============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3 font-medium">Primary Buttons</p>
        <div className="flex gap-3 items-center flex-wrap">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="default">
            Default
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-3 font-medium">Secondary Buttons</p>
        <div className="flex gap-3 items-center flex-wrap">
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="default">
            Default
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      <div className="text-center">
        <Button variant="primary" size="sm">
          Small
        </Button>
        <p className="text-xs text-muted-foreground mt-2">h-9, px-3</p>
      </div>
      <div className="text-center">
        <Button variant="primary" size="default">
          Default
        </Button>
        <p className="text-xs text-muted-foreground mt-2">h-10, px-4</p>
      </div>
      <div className="text-center">
        <Button variant="primary" size="lg">
          Large
        </Button>
        <p className="text-xs text-muted-foreground mt-2">h-11, px-8</p>
      </div>
    </div>
  ),
};

// ============================================================================
// Real-World Examples
// ============================================================================

export const FormActions: Story = {
  render: () => (
    <div className="flex gap-3 p-4 bg-card rounded-lg border border-border">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </div>
  ),
};

export const CTASection: Story = {
  render: () => (
    <div className="p-8 bg-linear-to-r from-primary/10 to-accent/10 rounded-xl text-center max-w-md">
      <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
      <p className="text-muted-foreground mb-6">
        Join thousands of developers building with our components.
      </p>
      <div className="flex gap-3 justify-center">
        <Button variant="primary" size="lg">
          Get Started Free
        </Button>
        <Button variant="secondary" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  ),
};

export const ModalFooter: Story = {
  render: () => (
    <div className="p-4 bg-card rounded-lg border border-border max-w-sm">
      <h3 className="font-semibold mb-2">Delete Item</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm" className="bg-destructive hover:bg-destructive/90">
          Delete
        </Button>
      </div>
    </div>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex p-4">
      <Button variant="secondary" className="rounded-r-none border-r-0">
        Previous
      </Button>
      <Button variant="secondary" className="rounded-none border-x-0">
        Current
      </Button>
      <Button variant="secondary" className="rounded-l-none border-l-0">
        Next
      </Button>
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Button variant="primary" disabled className="relative">
        <span className="opacity-0">Save Changes</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <title>Save Changes</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      </Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Button variant="primary">
        <span className="mr-2">+</span>
        {'Add Item'}
      </Button>
      <Button variant="secondary">
        {'Settings'}
        <span className="ml-2">⚙</span>
      </Button>
      <Button variant="primary" size="sm">
        <span>→</span>
      </Button>
    </div>
  ),
};
