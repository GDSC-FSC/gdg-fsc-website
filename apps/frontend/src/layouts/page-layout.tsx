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
import { Code, Menu, X } from 'lucide-react';
import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../providers';

const navLinks = [
  { to: '/about', label: 'About', color: 'blue' },
  { to: '/events', label: 'Events', color: 'red' },
  { to: '/projects', label: 'Projects', color: 'yellow' },
  { to: '/team', label: 'Team', color: 'green' },
];

export const PageLayout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background w-dvw">
      <Nav />
      <main>{children}</main>
    </div>
  );
};

PageLayout.displayName = 'PageLayout';
export default PageLayout;

const Nav = memo(() => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrollY > 50 ? 'rgba(var(--background), 0.8)' : 'rgba(var(--background), 0.6)',
        backdropFilter: 'blur(20px)',
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
            {navLinks.map((item) => (
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
            {navLinks.map((item) => (
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
  );
});

