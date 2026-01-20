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

import { Compass, Heart, Sparkles, Target, Users } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { Text } from '../../../../packages/interface';
import { about, stats } from '../constants';
import { PageLayout } from '../layouts';

const iconMap = {
  mission: Target,
  vision: Compass,
  values: Heart,
  default: Sparkles,
};

const colorSchemes = [
  {
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20',
    border: 'border-blue-500/30',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'bg-gradient-to-br from-blue-500 to-blue-600',
    shadow: 'hover:shadow-blue-500/20',
  },
  {
    gradient: 'from-red-500 to-red-600',
    bg: 'bg-gradient-to-br from-red-500/10 to-red-600/10 dark:from-red-500/20 dark:to-red-600/20',
    border: 'border-red-500/30',
    text: 'text-red-600 dark:text-red-400',
    icon: 'bg-gradient-to-br from-red-500 to-red-600',
    shadow: 'hover:shadow-red-500/20',
  },
  {
    gradient: 'from-green-500 to-green-600',
    bg: 'bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20',
    border: 'border-green-500/30',
    text: 'text-green-600 dark:text-green-400',
    icon: 'bg-gradient-to-br from-green-500 to-green-600',
    shadow: 'hover:shadow-green-500/20',
  },
];

export const About: FC = memo(() => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">Our Community</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About GDG on Campus FSC
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
              {about.paragraphs.map((text, i) => (
                <Text
                  key={`about-paragraph-${Number(i)}`}
                  className={`text-lg leading-relaxed ${
                    i === about.paragraphs.length - 1
                      ? 'text-sm italic text-muted-foreground/80'
                      : 'text-muted-foreground'
                  }`}
                >
                  {text}
                </Text>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {about.cards.map((card, index) => {
              const scheme = colorSchemes[index % colorSchemes.length];
              const IconComponent =
                iconMap[card.title.toLowerCase() as keyof typeof iconMap] || iconMap.default;

              return (
                <div
                  key={card.title}
                  className={`group relative p-8 rounded-3xl ${scheme.bg} backdrop-blur-xl border ${scheme.border} transition-all duration-500 hover:scale-105 ${scheme.shadow} hover:shadow-2xl`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${scheme.icon} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-4 ${scheme.text}`}>{card.title}</h3>
                  <Text className="text-muted-foreground leading-relaxed">{card.description}</Text>

                  {/* Decorative corner */}
                  <div
                    className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${scheme.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}
                  />
                </div>
              );
            })}
          </div>

          {/* Stats or additional info */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-wrap justify-center gap-8 p-8 rounded-3xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20">
              {stats.map((stat, index) => {
                const Icon = iconMap[stat.icon.toLowerCase() as keyof typeof iconMap] || iconMap.default;
                return (
                  <div key={stat.label} className="text-center px-6">
                    <Icon
                      className={`w-8 h-8 mx-auto mb-3 ${
                        ['text-blue-500', 'text-red-500', 'text-green-500', 'text-yellow-500'][index % 4]
                      }`}
                    />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

About.displayName = 'About';
export default About;
