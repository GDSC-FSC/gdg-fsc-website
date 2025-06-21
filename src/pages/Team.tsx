import { Code } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import  { Card, CardContent } from "../components/ui/card";

const Team = () => {
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

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Leadership Team
            </h1>
            <p className="text-xl text-muted-foreground">
              Student leaders driving innovation and community growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            <Card className="text-center hover:scale-105 transition-all duration-500 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background hover:shadow-xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform duration-300">
                  AS
                </div>
                <h3 className="text-xl font-semibold mb-2">Alex Smith</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">President</p>
                <p className="text-sm text-muted-foreground">Android Development & Machine Learning</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-all duration-500 bg-gradient-to-b from-red-50 to-white dark:from-red-950/30 dark:to-background hover:shadow-xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform duration-300">
                  MR
                </div>
                <h3 className="text-xl font-semibold mb-2">Maria Rodriguez</h3>
                <p className="text-red-600 dark:text-red-400 font-medium mb-3">Vice President</p>
                <p className="text-sm text-muted-foreground">Web Development & Cloud Computing</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-all duration-500 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-950/30 dark:to-background hover:shadow-xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform duration-300">
                  DW
                </div>
                <h3 className="text-xl font-semibold mb-2">David Wang</h3>
                <p className="text-yellow-600 dark:text-yellow-400 font-medium mb-3">Tech Lead</p>
                <p className="text-sm text-muted-foreground">Full-Stack Development & DevOps</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-all duration-500 bg-gradient-to-b from-green-50 to-white dark:from-green-950/30 dark:to-background hover:shadow-xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform duration-300">
                  SP
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah Park</h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-3">Community Manager</p>
                <p className="text-sm text-muted-foreground">UX Design & Community Outreach</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
