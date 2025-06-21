import { Code, Laptop, Users } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import  { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Events = () => {
  return (
    <div className="min-h-screen bg-background w-[100dvw]">
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

      {/* Events Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
              Upcoming Events
            </h1>
            <p className="text-xl text-muted-foreground">
              Join us for hands-on workshops, tech talks, and collaborative projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="hover:scale-105 transition-all duration-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800 hover:shadow-xl animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Laptop className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-700 dark:text-blue-300">Android Development Workshop</CardTitle>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Every Tuesday</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn to build Android applications using Kotlin and Android Studio with hands-on projects and real-world examples.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-all duration-500 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border-red-200 dark:border-red-800 hover:shadow-xl animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-red-700 dark:text-red-300">Web Development Bootcamp</CardTitle>
                    <p className="text-sm text-red-600 dark:text-red-400">Monthly Sessions</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master modern web technologies including React, Node.js, and Google Cloud Platform through guided projects.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-all duration-500 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 border-yellow-200 dark:border-yellow-800 hover:shadow-xl animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-700 dark:text-yellow-300">Tech Talks & Networking</CardTitle>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">Every Friday</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Weekly sessions featuring industry professionals, Google technologies, and networking opportunities with fellow developers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;