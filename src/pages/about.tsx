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

import type { FC } from 'react';
import { memo } from 'react';
import { Text } from '../../interface';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { about } from '../constants';
import { PageLayout } from '../layouts';

export const About: FC = memo(() => {
  return (
    <PageLayout>
      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              About GDG on Campus FSC
            </h1>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              {about.paragraphs.map((text, i) => (
                <Text
                  key={i}
                  className={i === about.paragraphs.length - 1 ? 'text-sm italic' : undefined}
                >
                  {text}
                </Text>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {about.cards.map((card, i) => (
              <Card
                key={card.title}
                className={`border-l-4 border-l-${card.color}-500 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in`}
              >
                <CardHeader>
                  <CardTitle className={`text-${card.color}-600`}>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text className="text-muted-foreground">{card.description}</Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

About.displayName = 'About';
export default About;
