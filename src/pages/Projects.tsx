
import { Code } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import  { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 animate-fade-in hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent">
                GDG on Campus FSC
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-green-600 bg-clip-text text-transparent">
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-world solutions built by our developer community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-green-700 dark:text-green-300">Campus Navigator</CardTitle>
                <p className="text-green-600 dark:text-green-400">Mobile Application</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Android app helping FSC students navigate campus, find classrooms, and connect with campus resources using Google Maps API and Firebase.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm hover:scale-105 transition-transform duration-300">Android</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm hover:scale-105 transition-transform duration-300">Firebase</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm hover:scale-105 transition-transform duration-300">Google Maps</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">StudyBuddy</CardTitle>
                <p className="text-purple-600 dark:text-purple-400">Web Platform</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Collaborative study platform built with React and Google Cloud, connecting students for group study sessions and resource sharing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:scale-105 transition-transform duration-300">React</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:scale-105 transition-transform duration-300">Google Cloud</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:scale-105 transition-transform duration-300">Node.js</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;