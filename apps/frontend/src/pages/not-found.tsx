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
import { logger } from '@gdg-fsc/utils';
import { ArrowLeft, Home, Search } from 'lucide-react';
import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const NotFound: FC = memo(() => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    logger.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-dvw bg-background overflow-hidden relative flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-red-50/60 to-yellow-50/80 dark:from-blue-950/40 dark:via-red-950/30 dark:to-yellow-950/40" />

        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '2s',
            transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '0.5s',
            transform: `translate(${-mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1
            className="text-[12rem] md:text-[16rem] font-black leading-none select-none"
            style={{
              background:
                'linear-gradient(135deg, #4285F4 0%, #EA4335 25%, #FBBC05 50%, #34A853 75%, #4285F4 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 3s ease-in-out infinite',
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            404
          </h1>
          {/* Glow effect behind text */}
          <div
            className="absolute inset-0 text-[12rem] md:text-[16rem] font-black leading-none select-none blur-2xl opacity-30"
            style={{
              background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            aria-hidden="true"
          >
            404
          </div>
        </div>

        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Search
              className="w-6 h-6 text-red-500 animate-bounce"
              style={{ animationDelay: '0.2s' }}
            />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Page Not Found</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-4">
            The page{' '}
            <code className="px-2 py-1 rounded-lg bg-muted/50 text-red-500 font-mono text-sm">
              {location.pathname}
            </code>{' '}
            doesn't exist.
          </p>

          <p className="text-muted-foreground mb-8">
            It might have been moved, deleted, or perhaps it never existed in the first place.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="group border-2 border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>

            <Link to="/">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 hover:from-blue-600 hover:via-red-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-4">
          {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((color, i) => (
            <div
              key={color}
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: color,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

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

NotFound.displayName = 'NotFound';
export default NotFound;
