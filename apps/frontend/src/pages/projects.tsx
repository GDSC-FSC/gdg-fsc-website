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

import { Schema } from 'effect';
import { ExternalLink, GitFork, Github, Star } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { DataLoader } from '../components/data-loader';
import { PageLayout } from '../layouts';

/**
 * Effect Schema for a GitHub repository response.
 */
const RepositorySchema = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  description: Schema.NullOr(Schema.String),
  html_url: Schema.String,
  stargazers_count: Schema.Number,
  forks_count: Schema.Number,
  language: Schema.NullOr(Schema.String),
  fork: Schema.Boolean,
  languages_url: Schema.String,
});

const RepositoriesSchema = Schema.Array(RepositorySchema);

type Repository = Schema.Schema.Type<typeof RepositorySchema>;

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  SCSS: 'bg-pink-500',
  Shell: 'bg-gray-500',
  Dockerfile: 'bg-blue-400',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Java: 'bg-red-600',
  C: 'bg-blue-700',
  'C++': 'bg-blue-600',
  'C#': 'bg-green-600',
  PHP: 'bg-indigo-500',
  Ruby: 'bg-red-500',
  Swift: 'bg-orange-500',
  Kotlin: 'bg-purple-600',
  Dart: 'bg-sky-500',
};

const cardStyles = [
  {
    gradient: 'from-slate-400 to-slate-500',
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-blue-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    gradient: 'from-slate-400 to-slate-500',
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-rose-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    gradient: 'from-slate-400 to-slate-500',
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-amber-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    gradient: 'from-slate-400 to-slate-500',
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-emerald-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
];

interface RepositoryCardProps {
  repo: Repository;
  style: (typeof cardStyles)[number];
  index: number;
}

const RepositoryCard: FC<RepositoryCardProps> = memo(({ repo, style, index }) => {
  const langColor = repo.language ? languageColors[repo.language] || 'bg-gray-400' : 'bg-gray-400';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`h-full rounded-2xl ${style.bg} backdrop-blur-sm border ${style.border} transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 ${style.shadow} hover:shadow-lg overflow-hidden`}
      >
        {/* Subtle accent bar */}
        <div className={`h-1 ${style.accent}`} />

        <div className="p-5 flex flex-col h-[calc(100%-4px)]">
          {/* Header with icon and title */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-xl ${style.accent} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
            >
              <Github className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-lg font-semibold ${style.text} truncate`}>{repo.name}</h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors shrink-0" />
              </div>
              {/* Language inline */}
              {repo.language && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-2 h-2 rounded-full ${langColor}`} />
                  <span className="text-xs text-muted-foreground">{repo.language}</span>
                </div>
              )}
            </div>
          </div>

          {/* Fork badge */}
          {repo.fork && (
            <div className="mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                <GitFork className="w-3 h-3" />
                Forked
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground flex-1 line-clamp-2 mb-4">
            {repo.description || 'No description available.'}
          </p>

          {/* Footer stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/40">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

RepositoryCard.displayName = 'RepositoryCard';

const RepositoryGrid: FC<{ repositories: readonly Repository[] }> = memo(({ repositories }) => {
  if (repositories.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
          <Github className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-lg text-muted-foreground">No repositories found</p>
      </div>
    );
  }

  return (
    <>
      {repositories.map((repo, index) => (
        <RepositoryCard
          key={repo.id}
          repo={repo}
          style={cardStyles[index % cardStyles.length]}
          index={index}
        />
      ))}
    </>
  );
});

RepositoryGrid.displayName = 'RepositoryGrid';

export const Projects: FC = memo(() => {
  return (
    <PageLayout>
      {/* Projects Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <Github className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-muted-foreground">Open Source</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #FBBC05 0%, #34A853 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Repositories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our open source projects and contributions on GitHub
            </p>
          </div>

          {/* Repository Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <DataLoader
              url="/api/v1/repos"
              schema={RepositoriesSchema}
              params={{ per_page: 100 }}
              queryKey={['repositories']}
              staleTime={1_000 * 60 * 10}
              refetchInterval={1_000 * 60 * 10}
            >
              {(repositories: readonly Repository[]) => (
                <RepositoryGrid repositories={repositories} />
              )}
            </DataLoader>
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

Projects.displayName = 'Projects';
export default Projects;
