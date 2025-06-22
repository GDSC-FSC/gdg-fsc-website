import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import PageLayout from "../layouts";
import { memo } from 'react'
import type { FC } from 'react'

const About: FC = memo(() => {
  return (
    <PageLayout>
      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              About GDG on Campus FSC
            </h1>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                GDG on Campus Farmingdale State College - Farmingdale, United States is an independent group where students can gain practical experience in building applications and services, develop their software engineering skills, and explore new areas of technology. This helps them become better prepared for careers in the technology industry and contribute to the development of innovative solutions that can positively impact society.
              </p>
              <p>
                Google Developer Groups (GDG) are community groups for developers interested in learning and practicing development skills. These groups provide a space for developers to learn how to build real-world solutions using various technologies and platforms, offering opportunities for members to connect, learn, and grow together.
              </p>
              <p>
                The purpose of GDG on Campus is to empower students to learn, grow, and connect with other developers through hands-on workshops, mentorship, and collaboration. We offer a platform for students to explore new technologies, work on real-world projects, and build their professional networks.
              </p>
              <p className="text-sm italic">
                GDG on Campus Farmingdale State College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-blue-600">Practical Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gain hands-on experience building applications and services while developing your software engineering skills and exploring new areas of technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-red-600">Learn & Grow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with other developers through hands-on workshops, mentorship, and collaboration opportunities that help you grow your professional network.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-green-600">Career Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Become better prepared for careers in the technology industry and contribute to innovative solutions that can positively impact society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
});
About.displayName = "About";
export default About;