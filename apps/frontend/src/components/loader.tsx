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

import { Code } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

/**
 * A branded loading spinner component with GDG colors and animations.
 *
 * @component
 * @description
 * Displays a centered loading animation with:
 * - A central Code icon
 * - Orbiting dots in Google brand colors (Blue, Red, Yellow, Green)
 * - Glassmorphism effects
 * - Animated background gradients
 */
export const Loader = React.memo(
  () => {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Orbiting Dots Container */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Central Icon */}
            <div className="relative z-20 w-12 h-12 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center shadow-xl">
              <Code className="w-6 h-6 text-foreground" />
            </div>

            {/* Rotating Ring */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              {/* Dot 1 - Top (Blue) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              {/* Dot 2 - Right (Red) */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              {/* Dot 3 - Bottom (Green) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              {/* Dot 4 - Left (Yellow) */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold bg-linear-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
              GDG on Campus
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Farmingdale State College</p>
          </motion.div>
        </motion.div>
      </div>
    );
  },
  () => true,
);

Loader.displayName = 'Loader';
export default Loader;
