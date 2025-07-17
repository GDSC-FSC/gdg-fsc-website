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
import { Card, CardContent } from '../components/ui/card';
import { team } from '../constants';
import { PageLayout } from '../layouts';

export const Team: FC = memo(() => {
  return (
    <PageLayout>
      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Leadership Team
            </h1>
            <p className="text-xl text-muted-foreground">
              Student leaders driving innovation and community growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {team.map((team) => (
              <Card
                key={team.name}
                className="text-center hover:scale-105 transition-all duration-500 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background hover:shadow-xl animate-fade-in"
              >
                <CardContent className="pt-8">
                  {team.image ? (
                    <picture>
                      <source srcSet={team.image} type="image/webp" />
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-blue-400 dark:border-blue-600 rotate-[270deg]"
                      />
                    </picture>
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform duration-300">
                      {team.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {team.position}
                  </p>
                  <p className="text-sm text-muted-foreground">{team.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

Team.displayName = 'Team';
export default Team;
