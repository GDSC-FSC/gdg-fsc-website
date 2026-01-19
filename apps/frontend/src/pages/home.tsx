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

import { ArrowRight, Calendar, Code, Laptop, Menu, Sparkles, Users, X } from 'lucide-react';
import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text } from '../../../../packages/interface';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden w-dvw">
      {/* Navigation - Glassmorphism */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrollY > 50 ? 'rgba(var(--background), 0.8)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
          borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
                GDG on Campus FSC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { to: '/about', label: 'About', color: 'blue' },
                { to: '/events', label: 'Events', color: 'red' },
                { to: '/projects', label: 'Projects', color: 'yellow' },
                { to: '/team', label: 'Team', color: 'green' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-2 text-foreground font-medium transition-all duration-300 hover:text-${item.color}-500 group`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-${item.color}-500 transition-all duration-300 group-hover:w-full group-hover:left-0`}
                  />
                </Link>
              ))}
              <div className="ml-4 pl-4 border-l border-border">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Glassmorphism */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-background/90 border-b border-white/10 shadow-xl">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {[
                { to: '/about', label: 'About', color: 'blue' },
                { to: '/events', label: 'Events', color: 'red' },
                { to: '/projects', label: 'Projects', color: 'yellow' },
                { to: '/team', label: 'Team', color: 'green' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 text-lg font-medium rounded-xl transition-all duration-300 hover:bg-${item.color}-500/10 hover:text-${item.color}-500`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-yellow-50/60 to-green-50/80 dark:from-blue-950/40 dark:via-red-950/30 dark:to-green-950/40" />

          {/* Floating orbs with parallax */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              top: '10%',
              left: '5%',
              background: 'radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              top: '50%',
              right: '5%',
              background: 'radial-gradient(circle, rgba(234, 67, 53, 0.15) 0%, transparent 70%)',
              transform: `translateY(${-scrollY * 0.15}px)`,
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              bottom: '10%',
              left: '30%',
              background: 'radial-gradient(circle, rgba(251, 188, 5, 0.15) 0%, transparent 70%)',
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full"
            style={{
              top: '30%',
              right: '25%',
              background: 'radial-gradient(circle, rgba(52, 168, 83, 0.15) 0%, transparent 70%)',
              transform: `translateY(${-scrollY * 0.08}px)`,
            }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 mb-12 hover:scale-105 transition-all duration-300 shadow-lg">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <Text className="text-sm font-medium bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {home.hero.badge}
            </Text>
          </div>

          {/* Main Title */}
          <Text
            component="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            style={{
              background:
                'linear-gradient(135deg, #4285F4 0%, #EA4335 30%, #FBBC05 60%, #34A853 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease-in-out infinite',
            }}
          >
            {home.hero.title}
          </Text>

          {/* Subtitle */}
          <Text
            component="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-foreground/90"
          >
            {home.hero.subtitle}
          </Text>

          {/* Description */}
          <Text className="text-lg md:text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            {home.hero.description}
          </Text>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            {home.ctaButtons.map((btn: CTAButton, index: number) => {
              const Icon = btn.icon ? iconMap[btn.icon] : null;
              if (btn.external) {
                return (
                  <Button
                    key={btn.label}
                    size="lg"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 group"
                    onClick={() => globalThis.open(btn.href, '_blank', 'noreferrer noopener')}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10 flex items-center">
                      {btn.label}
                      {Icon && (
                        <Icon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                );
              }
              return (
                <Link to={btn.href} key={btn.label}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 px-10 py-7 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25"
                  >
                    {btn.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {home.quickNav.map((nav: QuickNav, index: number) => {
              const Icon = iconMap[nav.icon as keyof typeof iconMap];
              const colors = {
                blue: {
                  bg: 'from-blue-500/20 to-blue-600/20',
                  hover: 'hover:from-blue-500/30 hover:to-blue-600/30',
                  icon: 'from-blue-500 to-blue-600',
                  text: 'text-blue-600 dark:text-blue-400',
                },
                red: {
                  bg: 'from-red-500/20 to-red-600/20',
                  hover: 'hover:from-red-500/30 hover:to-red-600/30',
                  icon: 'from-red-500 to-red-600',
                  text: 'text-red-600 dark:text-red-400',
                },
                yellow: {
                  bg: 'from-yellow-500/20 to-yellow-600/20',
                  hover: 'hover:from-yellow-500/30 hover:to-yellow-600/30',
                  icon: 'from-yellow-500 to-yellow-600',
                  text: 'text-yellow-600 dark:text-yellow-400',
                },
                green: {
                  bg: 'from-green-500/20 to-green-600/20',
                  hover: 'hover:from-green-500/30 hover:to-green-600/30',
                  icon: 'from-green-500 to-green-600',
                  text: 'text-green-600 dark:text-green-400',
                },
              };
              const colorScheme = colors[nav.color as keyof typeof colors] || colors.blue;

              return (
                <Link to={nav.to} className="group" key={nav.label}>
                  <div
                    className={`p-6 rounded-2xl bg-gradient-to-br ${colorScheme.bg} ${colorScheme.hover} backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${colorScheme.icon} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {Icon && <Icon className="h-7 w-7 text-white" />}
                    </div>
                    <Text component="h3" className={`font-semibold ${colorScheme.text}`}>
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-yellow-500/5 to-green-500/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {home.stats.map((stat, index) => {
              const colors: Record<string, string> = {
                blue: 'text-blue-500',
                red: 'text-red-500',
                yellow: 'text-yellow-500',
                green: 'text-green-500',
              };
              return (
                <div
                  className="text-center p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  key={stat.label}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Text
                    component="div"
                    className={`text-4xl md:text-5xl font-bold mb-2 ${colors[stat.color] || 'text-blue-500'}`}
                  >
                    {stat.value}
                  </Text>
                  <Text className="text-muted-foreground font-medium">{stat.label}</Text>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t bg-gradient-to-r from-blue-50/50 via-red-50/50 to-green-50/50 dark:from-blue-950/20 dark:via-red-950/20 dark:to-green-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-8 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
              </div>
              <Text
                component="span"
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent"
              >
                {home.footer.org}
              </Text>
            </Link>
            <Text className="text-muted-foreground mb-6 text-lg max-w-2xl mx-auto">
              {home.footer.description}
            </Text>
            <Text className="text-sm text-muted-foreground mb-3">{home.footer.group}</Text>
            <Text className="text-xs text-muted-foreground">{home.footer.disclaimer}</Text>
          </div>
        </div>
      </footer>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
