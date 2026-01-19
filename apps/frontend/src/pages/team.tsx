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

'use client';

import { Button } from '@gdg-fsc/interface';
import { Users } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { team } from '../constants';
import { PageLayout } from '../layouts';

const colorSchemes = [
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    ring: 'ring-blue-400/50',
    accent: 'bg-blue-500/80',
    text: 'text-slate-600 dark:text-slate-400',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    ring: 'ring-rose-400/50',
    accent: 'bg-rose-500/80',
    text: 'text-slate-600 dark:text-slate-400',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    ring: 'ring-amber-400/50',
    accent: 'bg-amber-500/80',
    text: 'text-slate-600 dark:text-slate-400',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    ring: 'ring-emerald-400/50',
    accent: 'bg-emerald-500/80',
    text: 'text-slate-600 dark:text-slate-400',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
];

interface TeamCardProps {
  member: (typeof team)[number];
  colorScheme: (typeof colorSchemes)[number];
  index: number;
}

const TeamCard: FC<TeamCardProps> = memo(({ member, colorScheme, index }) => {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`group relative p-6 rounded-2xl ${colorScheme.bg} backdrop-blur-sm border ${colorScheme.border} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 ${colorScheme.shadow} hover:shadow-lg text-center`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar */}
      <div className="relative mx-auto mb-4 w-20 h-20">
        {member.image ? (
          <picture>
            <source srcSet={member.image} type="image/webp" />
            <img
              src={member.image}
              alt={member.name}
              className={`w-full h-full rounded-full object-cover ring-2 ${colorScheme.ring} ring-offset-2 ring-offset-background group-hover:scale-105 transition-transform duration-200`}
            />
          </picture>
        ) : (
          <div
            className={`w-full h-full rounded-full ${colorScheme.accent} flex items-center justify-center ring-2 ${colorScheme.ring} ring-offset-2 ring-offset-background group-hover:scale-105 transition-transform duration-200`}
          >
            <span className="text-xl font-semibold text-white">{initials}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-base font-semibold text-foreground mb-1">{member.name}</h3>
      <p className={`text-sm font-medium mb-1 ${colorScheme.text}`}>{member.position}</p>
      <p className="text-xs text-muted-foreground">{member.role}</p>
    </div>
  );
});

TeamCard.displayName = 'TeamCard';

export const Team: FC = memo(() => {
  return (
    <PageLayout>
      {/* Team Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Our Team</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #34A853 0%, #4285F4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Leadership Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Student leaders driving innovation and community growth
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <TeamCard
                key={member.name}
                member={member}
                colorScheme={colorSchemes[index % colorSchemes.length]}
                index={index}
              />
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-foreground mb-3">Want to join the team?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                We're always looking for passionate students to help lead and grow our community.
              </p>
              <Button
                onClick={() =>
                  globalThis.open(
                    'https://gdg.community.dev/gdg-on-campus-farmingdale-state-college-farmingdale-united-states/',
                    '_blank',
                    'noreferrer noopener',
                  )
                }
              >
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

Team.displayName = 'Team';
export default Team;
