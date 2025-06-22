"use client";

import { Code, Menu, Users, Laptop, Calendar, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components";
import { memo } from 'react'
import type { FC } from 'react'

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
              <Link to="/about" className="text-foreground hover:text-blue-500 transition-all duration-300 font-medium hover:scale-105">About</Link>
              <Link to="/events" className="text-foreground hover:text-red-500 transition-all duration-300 font-medium hover:scale-105">Events</Link>
              <Link to="/projects" className="text-foreground hover:text-yellow-500 transition-all duration-300 font-medium hover:scale-105">Projects</Link>
              <Link to="/team" className="text-foreground hover:text-green-500 transition-all duration-300 font-medium hover:scale-105">Team</Link>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-red-50/60 via-yellow-50/60 to-green-50/80 dark:from-blue-950/40 dark:via-red-950/30 dark:via-yellow-950/30 dark:to-green-950/40"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          {/* Main Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100/80 to-green-100/80 dark:from-blue-900/40 dark:to-green-900/40 backdrop-blur-sm mb-12 hover:scale-105 transition-transform duration-300 border border-white/20">
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Google Developer Groups on Campus
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent leading-tight">
              GDG on Campus
            </h1>

            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-foreground/90">
              Farmingdale State College
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
              An independent student group empowering developers to learn, grow, and connect through hands-on workshops, mentorship, and collaboration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-12 py-8 text-xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            <Link to="/about" className="group">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-blue-50/80 dark:hover:bg-blue-950/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">About Us</h3>
              </div>
            </Link>

            <Link to="/events" className="group">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-red-50/80 dark:hover:bg-red-950/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-red-600 dark:text-red-400">Events</h3>
              </div>
            </Link>

            <Link to="/projects" className="group">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-yellow-50/80 dark:hover:bg-yellow-950/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Laptop className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Projects</h3>
              </div>
            </Link>

            <Link to="/team" className="group">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:bg-green-50/80 dark:hover:bg-green-950/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-green-600 dark:text-green-400">Team</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500/5 via-red-500/5 via-yellow-500/5 to-green-500/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-blue-500 mb-2">150+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">30+</div>
              <div className="text-muted-foreground">Projects Built</div>
            </div>
            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-yellow-500 mb-2">40+</div>
              <div className="text-muted-foreground">Workshops</div>
            </div>
            <div className="text-center animate-fade-in hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-green-500 mb-2">3+</div>
              <div className="text-muted-foreground">Years Active</div>
            </div>
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
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
                GDG on Campus FSC
              </span>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Empowering students to learn, grow, and connect through technology.
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Google Developer Groups on Campus - Farmingdale State College
            </p>
            <p className="text-xs text-muted-foreground">
              An independent student organization. Not affiliated with Google, the corporation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

Home.displayName = "Home";
export default Home;
