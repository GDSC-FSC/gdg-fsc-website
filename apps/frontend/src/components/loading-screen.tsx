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

import { Code } from 'lucide-react';
import { type FC, memo, useEffect, useState } from 'react';

export const LoadingScreen: FC<{
  onLoadingComplete: () => void;
}> = memo(({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [, setTheme] = useState<string>('light');

  useEffect(() => {
    // Check theme from localStorage or system preference
    const storedTheme = globalThis.localStorage.getItem('theme');
    const systemTheme = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const currentTheme = storedTheme === 'system' ? systemTheme : storedTheme || systemTheme;

    setTheme(currentTheme);

    // Apply theme class to document element for loading screen
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-center space-y-8">
        {/* Minimalistic Logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Code className="h-8 w-8 text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-linear-to-br from-blue-500 to-green-500 rounded-2xl animate-ping opacity-20" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
              GDG on Campus FSC
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Loading...</p>
          </div>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';
export default LoadingScreen;
