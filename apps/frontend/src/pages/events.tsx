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
import { Calendar, Clock, ExternalLink, MapPin, Sparkles, Users } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';
import { DataLoader } from '../components/data-loader';
import { PageLayout } from '../layouts';
import { EVENTS_API, transformEvents } from '../services/api-config';

/**
 * Effect Schema for a single event response.
 */
const EventResponseSchema = Schema.Struct({
  id: Schema.String,
  title: Schema.NullOr(Schema.String),
  thumbnailLink: Schema.NullOr(Schema.String),
  detailsLink: Schema.NullOr(Schema.String),
  eventType: Schema.optional(Schema.String),
  isUpcoming: Schema.optional(Schema.Boolean),
});

/**
 * Effect Schema for the events list response with pagination metadata.
 */
const EventsListResponseSchema = Schema.Struct({
  data: Schema.Array(EventResponseSchema),
  meta: Schema.Struct({
    total: Schema.Number,
    page: Schema.Number,
    limit: Schema.Number,
    totalPages: Schema.Number,
  }),
});

type EventsListResponse = Schema.Schema.Type<typeof EventsListResponseSchema>;
type EventResponse = Schema.Schema.Type<typeof EventResponseSchema>;

interface EventCardProps {
  event: EventResponse;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    shadow: string;
  };
  index: number;
}

const EventCard: FC<EventCardProps> = memo(({ event, colorScheme, index }) => {
  const { title, thumbnailLink, detailsLink, eventType } = event;

  return (
    <a
      href={detailsLink ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`h-full rounded-2xl overflow-hidden ${colorScheme.bg} backdrop-blur-sm border ${colorScheme.border} transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 ${colorScheme.shadow} hover:shadow-lg`}
      >
        {/* Thumbnail */}
        {thumbnailLink && (
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={thumbnailLink}
              alt={title ?? 'Event thumbnail'}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {eventType && (
              <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 rounded bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                  {eventType}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`w-10 h-10 ${colorScheme.accent} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
            >
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-lg font-semibold ${colorScheme.text} truncate`}>
                  {title ?? 'Untitled Event'}
                </h3>
                {detailsLink && (
                  <ExternalLink className="w-4 h-4 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                <MapPin className="w-3 h-3" />
                View details
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

EventCard.displayName = 'EventCard';

const upcomingColorSchemes = [
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-blue-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-emerald-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-violet-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
];

const pastColorSchemes = [
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-rose-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-amber-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
  {
    bg: 'bg-white/60 dark:bg-slate-800/60',
    border: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-200',
    accent: 'bg-orange-500/80',
    shadow: 'hover:shadow-slate-300/30 dark:hover:shadow-slate-900/30',
  },
];

const EmptyState: FC<{ message: string }> = ({ message }) => (
  <div className="col-span-full text-center py-16">
    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
      <Clock className="h-10 w-10 text-muted-foreground" />
    </div>
    <p className="text-lg text-muted-foreground">{message}</p>
  </div>
);

const EventsGrid: FC<{
  events: EventsListResponse;
  colorSchemes: typeof upcomingColorSchemes;
}> = memo(({ events, colorSchemes }) => {
  if (events.data.length === 0) {
    return <EmptyState message="No events found" />;
  }

  return (
    <>
      {events.data.map((event, index) => (
        <EventCard
          key={event.id || `event-${index}`}
          event={event}
          colorScheme={colorSchemes[index % colorSchemes.length]}
          index={index}
        />
      ))}
    </>
  );
});

EventsGrid.displayName = 'EventsGrid';

export const Events: FC = memo(() => {
  return (
    <PageLayout>
      {/* Upcoming Events Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">Join Us</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Upcoming Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for hands-on workshops, tech talks, and collaborative projects
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <DataLoader<EventsListResponse>
              url={EVENTS_API.UPCOMING}
              queryKey={['events', 'upcoming']}
              staleTime={1_000 * 60 * 5}
              refetchInterval={1_000 * 60 * 5}
              options={{ timeout: 60_000, retries: 2, retryDelay: 5_000 }}
              transform={(data: unknown) => transformEvents(data as EventResponse[])}
            >
              {(events: EventsListResponse) => (
                <EventsGrid events={events} colorSchemes={upcomingColorSchemes} />
              )}
            </DataLoader>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="relative py-24 overflow-hidden bg-muted/30">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <Users className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-muted-foreground">Archive</span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
              style={{
                background: 'linear-gradient(135deg, #EA4335 0%, #FBBC05 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Past Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check out what we've been up to - recordings and resources available
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <DataLoader<EventsListResponse>
              url={EVENTS_API.PAST}
              queryKey={['events', 'past']}
              staleTime={1_000 * 60 * 10}
              refetchInterval={1_000 * 60 * 10}
              options={{ timeout: 60_000, retries: 2, retryDelay: 5_000 }}
              transform={(data: unknown) => transformEvents(data as EventResponse[])}
            >
              {(events: EventsListResponse) => (
                <EventsGrid events={events} colorSchemes={pastColorSchemes} />
              )}
            </DataLoader>
          </div>
        </div>
      </section>
    </PageLayout>
  );
});

Events.displayName = 'Events';
export default Events;
