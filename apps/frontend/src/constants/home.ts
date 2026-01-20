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

export const home = {
  hero: {
    badge: 'Google Developer Groups on Campus',
    title: 'GDG on Campus',
    subtitle: 'Farmingdale State College',
    description:
      'An independent student group empowering developers to learn, grow, and connect through hands-on workshops, mentorship, and collaboration.',
  },
  ctaButtons: [
    {
      label: 'Join Our Community',
      href: 'https://gdg.community.dev/gdg-on-campus-farmingdale-state-college-farmingdale-united-states/',
      external: true,
      color: 'blue',
      icon: 'ArrowRight',
    },
    {
      label: 'Explore Projects',
      href: '/projects',
      external: false,
      color: 'red',
      icon: undefined,
    },
  ],
  quickNav: [
    {
      to: '/about',
      color: 'blue',
      icon: 'Users',
      label: 'About Us',
    },
    {
      to: '/events',
      color: 'red',
      icon: 'Calendar',
      label: 'Events',
    },
    {
      to: '/projects',
      color: 'yellow',
      icon: 'Laptop',
      label: 'Projects',
    },
    {
      to: '/team',
      color: 'green',
      icon: 'Users',
      label: 'Team',
    },
  ],
  footer: {
    org: 'GDG on Campus FSC',
    description: 'Empowering students to learn, grow, and connect through technology.',
    group: 'Google Developer Groups on Campus - Farmingdale State College',
    disclaimer: 'An independent student organization. Not affiliated with Google, the corporation.',
  },
} as const;
