"use client";

import { Card, CardContent } from "../components/ui/card";
import { PageLayout } from "../layouts";
import { memo } from 'react'
import type { FC } from 'react'
import { leaders } from "../constants";

export const Team: FC = memo(() => {
  return (
    <PageLayout>
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
            {leaders.map((leader,) => (
              <Card
                key={leader.name}
                className="text-center hover:scale-105 transition-all duration-500 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background hover:shadow-xl animate-fade-in"
              >
                <CardContent className="pt-8">
                  {leader.image ? (
                    <picture>
                      <source
                        srcSet={leader.image}
                        type="image/webp"
                      />
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-blue-400 dark:border-blue-600 rotate-[270deg]"
                      />
                    </picture>
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 transition-transform duration-300">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{leader.position}</p>
                  <p className="text-sm text-muted-foreground">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

Team.displayName = "Team"
export default Team;
