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

export default {
  stories: [
    {
      directory: '../shared',
      files: '**/*.stories.@(ts|tsx)',
      titlePrefix: 'Shared',
    }
  ], 
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/react-vite',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-events',
    '@storybook/addon-google-analytics',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true
    },
  },
  staticDirs: ['../public'],
  docs: { 
    docsMode: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
} satisfies import('@storybook/react-vite').StorybookConfig;
