"use client";

import { GitFork, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../layouts/PageLayout";
import { memo } from 'react'
import type { FC } from 'react'

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  languages_url: string;
}

const fetchRepositories = async (): Promise<Repository[]> => {
  const response = await fetch("https://api.github.com/orgs/GDSC-FSC/repos?per_page=100");
  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }
  const data: Repository[] = await response.json();

  const reposWithLanguages = await Promise.all(
    data.map(async (repo) => {
      if (repo.language === null) {
        try {
          const languagesResponse = await fetch(repo.languages_url);
          if (languagesResponse.ok) {
            const languages = await languagesResponse.json();
            if (Object.keys(languages).length > 0) {
              const primaryLanguage = Object.keys(languages).reduce((a, b) =>
                languages[a] > languages[b] ? a : b
              );
              return { ...repo, language: primaryLanguage };
            }
          }
        } catch (error) {
          console.error(`Failed to fetch languages for ${repo.name}`, error);
        }
      }
      return repo;
    })
  );

  return reposWithLanguages;
};

export const Projects: FC = memo(() => {
  const {
    data: repositories,
    error,
    isLoading,
  } = useQuery<Repository[], Error>({
    queryKey: ["repositories"],
    queryFn: fetchRepositories,
  });

  enum Language {
    TypeScript = "TypeScript",
    JavaScript = "JavaScript",
    Python = "Python",
    HTML = "HTML",
    CSS = "CSS",
    SCSS = "SCSS",
    Shell = "Shell",
    Dockerfile = "Dockerfile",
    Go = "Go",
    Rust = "Rust",
    Java = "Java",
    C = "C",
    "C++" = "C++",
    CSharp = "C#",
    PHP = "PHP",
    Ruby = "Ruby",
    Swift = "Swift",
    Kotlin = "Kotlin",
    ObjectiveC = "Objective-C",
    Perl = "Perl",
    Scala = "Scala",
    Haskell = "Haskell",
    Dart = "Dart",
    Elixir = "Elixir",
    Lua = "Lua",
    R = "R",
    MATLAB = "MATLAB",
    PowerShell = "PowerShell",
    Assembly = "Assembly",
    Groovy = "Groovy",
    VisualBasic = "Visual Basic",
    FSharp = "F#",
    WebAssembly = "WebAssembly",
    Default = "default",
  }

  const languageColors: Record<Language, string> = {
    [Language.TypeScript]: "bg-blue-400",
    [Language.JavaScript]: "bg-yellow-400",
    [Language.Python]: "bg-green-400",
    [Language.HTML]: "bg-orange-400",
    [Language.CSS]: "bg-purple-400",
    [Language.SCSS]: "bg-pink-400",
    [Language.Shell]: "bg-gray-400",
    [Language.Dockerfile]: "bg-blue-300",
    [Language.Go]: "bg-cyan-400",
    [Language.Rust]: "bg-orange-500",
    [Language.Java]: "bg-red-600",
    [Language.C]: "bg-blue-800",
    ["C++"]: "bg-blue-700",
    [Language.CSharp]: "bg-green-700",
    [Language.PHP]: "bg-indigo-400",
    [Language.Ruby]: "bg-red-400",
    [Language.Swift]: "bg-orange-500",
    [Language.Kotlin]: "bg-purple-500",
    [Language.ObjectiveC]: "bg-gray-600",
    [Language.Perl]: "bg-pink-300",
    [Language.Scala]: "bg-red-700",
    [Language.Haskell]: "bg-purple-700",
    [Language.Dart]: "bg-sky-400",
    [Language.Elixir]: "bg-purple-300",
    [Language.Lua]: "bg-blue-300",
    [Language.R]: "bg-blue-200",
    [Language.MATLAB]: "bg-yellow-600",
    [Language.PowerShell]: "bg-blue-500",
    [Language.Assembly]: "bg-gray-700",
    [Language.Groovy]: "bg-green-500",
    [Language.VisualBasic]: "bg-indigo-700",
    [Language.FSharp]: "bg-green-300",
    [Language.WebAssembly]: "bg-purple-800",
    [Language.Default]: "bg-gray-500",
  };

  const cardStyles = [
    {
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800",
      title: "text-blue-700 dark:text-blue-300",
    },
    {
      bg: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200 dark:border-red-800",
      title: "text-red-700 dark:text-red-300",
    },
    {
      bg: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border-yellow-200 dark:border-yellow-800",
      title: "text-yellow-700 dark:text-yellow-300",
    },
    {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800",
      title: "text-green-700 dark:text-green-300",
    },
  ];

  return (
    <PageLayout>
      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent">
              Repositories
            </h1>
            <p className="text-xl text-muted-foreground">
              Check out the repositories from our GitHub organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {isLoading && (
              <p className="text-center col-span-full">Loading repositories...</p>
            )}
            {error && (
              <p className="text-center col-span-full text-red-500">
                Error: {error.message}
              </p>
            )}
            {!isLoading && !error && repositories && repositories.length === 0 && (
              <p className="text-center col-span-full">
                No repositories found for this organization.
              </p>
            )}
            {!isLoading &&
              !error &&
              repositories &&
              repositories.map((repo, index) => {
                const style = cardStyles[index % cardStyles.length];
                const langColor = repo.language
                  ? languageColors[repo.language as unknown as Language] || languageColors.default
                  : languageColors.default;

                return (
                  <a
                    href={repo.html_url}
                    key={repo.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card
                      className={`h-full flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in ${style.bg}`}
                    >
                      <div>
                        <CardHeader>
                          <CardTitle className={`text-2xl ${style.title}`}>
                            {repo.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {repo.description ||
                              "No description for this repository."}
                          </p>
                        </CardContent>
                      </div>
                      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {repo.language && (
                            <>
                              <div
                                className={`h-3 w-3 rounded-full ${langColor}`}
                              />
                              <span>{repo.language}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </a>
                );
              })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

Projects.displayName = "Projects";
export default Projects;