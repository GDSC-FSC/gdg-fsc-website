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

import { ArrowLeft, Code } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../providers';

export const PageLayout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background w-[100dvw]">
      <Nav />
      <main>{children}</main>
    </div>
  );
};

PageLayout.displayName = 'PageLayout';
export default PageLayout;

const Nav = memo(() => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 animate-fade-in hover:scale-105 transition-transform duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
              GDG on Campus FSC
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
});
