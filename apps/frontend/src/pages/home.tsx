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

import { ArrowRight, Calendar, Code, Laptop, Menu, Users } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../packages/interface';
import { Button } from '../components/ui/button';
import { home } from '../constants';
import { ThemeToggle } from '../providers';

const iconMap = {
  Users,
  Laptop,
  Calendar,
  ArrowRight,
};

type CTAButton = (typeof home.ctaButtons)[number];

type QuickNav = (typeof home.quickNav)[number];

export const Home: FC = memo(() => {
  return (
    <div className="min-h-screen bg-background overflow-hidden w-[100dvw]">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
                GDG on Campus FSC
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8 animate-fade-in">
              <Link
                to="/about"
                className="text-foreground hover:text-blue-500 transition-all duration-300 font-medium hover:scale-105"
              >
                About
              </Link>
              <Link
                to="/events"
                className="text-foreground hover:text-red-500 transition-all duration-300 font-medium hover:scale-105"
              >
                Events
              </Link>
              <Link
                to="/projects"
                className="text-foreground hover:text-yellow-500 transition-all duration-300 font-medium hover:scale-105"
              >
                Projects
              </Link>
              <Link
                to="/team"
                className="text-foreground hover:text-green-500 transition-all duration-300 font-medium hover:scale-105"
              >
                Team
              </Link>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform duration-300"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen Splash */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-red-50/60 via-yellow-50/60 to-green-50/80 dark:from-blue-950/40 dark:via-red-950/30 dark:via-yellow-950/30 dark:to-green-950/40" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-3000" />
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          {/* Main Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100/80 to-green-100/80 dark:from-blue-900/40 dark:to-green-900/40 backdrop-blur-sm mb-12 hover:scale-105 transition-transform duration-300 border border-white/20">
              <Text className="text-sm font-medium bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {home.hero.badge}
              </Text>
            </div>

            <Text
              component="h1"
              className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent leading-tight"
            >
              {home.hero.title}
            </Text>

            <Text
              component="h2"
              className="text-3xl md:text-4xl font-semibold mb-8 text-foreground/90"
            >
              {home.hero.subtitle}
            </Text>

            <Text className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
              {home.hero.description}
            </Text>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              {home.ctaButtons.map((btn: CTAButton, i) => {
                const Icon =
                  (btn as any).icon && iconMap[(btn as any).icon as keyof typeof iconMap];
                if (btn.external) {
                  return (
                    <Button
                      key={btn.label}
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
                      onClick={() => window.open(btn.href, '_blank', 'noreferrer noopener')}
                    >
                      {btn.label}
                      {Icon && (
                        <Icon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </Button>
                  );
                }
                return (
                  <Link to={btn.href} key={btn.label}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-12 py-8 text-xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {btn.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            {home.quickNav.map((nav: QuickNav) => {
              const Icon = iconMap[nav.icon as keyof typeof iconMap];
              return (
                <Link to={nav.to} className="group" key={nav.label}>
                  <div
                    className={`p-6 rounded-2xl bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-${nav.color}-50/80 dark:hover:bg-${nav.color}-950/30 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-${nav.color}-400 to-${nav.color}-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {Icon && <Icon className="h-6 w-6 text-white" />}
                    </div>
                    <Text
                      component="h3"
                      className={`font-semibold text-${nav.color}-600 dark:text-${nav.color}-400`}
                    >
                      {nav.label}
                    </Text>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500/5 via-red-500/5 via-yellow-500/5 to-green-500/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {home.stats.map((stat) => (
              <div
                className="text-center animate-fade-in hover:scale-105 transition-all duration-300"
                key={stat.label}
              >
                <Text component="div" className={`text-4xl font-bold text-${stat.color}-500 mb-2`}>
                  {stat.value}
                </Text>
                <Text className="text-muted-foreground">{stat.label}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t bg-gradient-to-r from-blue-50/50 via-red-50/50 via-yellow-50/50 to-green-50/50 dark:from-blue-950/20 dark:via-red-950/20 dark:via-yellow-950/20 dark:to-green-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 text-white" />
              </div>
              <Text
                component="span"
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent"
              >
                {home.footer.org}
              </Text>
            </div>
            <Text className="text-muted-foreground mb-6 text-lg">{home.footer.description}</Text>
            <Text className="text-sm text-muted-foreground mb-3">{home.footer.group}</Text>
            <Text className="text-xs text-muted-foreground">{home.footer.disclaimer}</Text>
          </div>
        </div>
      </footer>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
