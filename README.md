# 🚀 GDG on Campus Farmingdale State College Website

## 🌟 Overview

The GDG on Campus Farmingdale State College Website serves as a central hub for a student developer community, providing information about the group's mission, events, projects, and leadership team. This project emphasizes hands-on experience, skill development, and collaboration among students.

Built with **React**, **TypeScript**, and **Vite** for the frontend, and a **Bun**-powered **Elysia.js** server for the backend API, the website delivers a fast, interactive, and type-safe experience. It integrates modern tooling for styling (**TailwindCSS**, **Shadcn UI**), state management (**Zustand**, **React Query**), and a robust testing suite (**Cypress**, **Playwright**, **Vitest**, **Jest**). Furthermore, it boasts Progressive Web App (PWA) capabilities for enhanced user experience and offline access, along with rich development utilities through custom shared classes and decorators.

This repository is actively maintained, with a strong focus on code quality, performance, and comprehensive documentation.

## ✨ Features

### Frontend (Client-side)

*   **Dynamic & Responsive UI**: A modern, single-page application built with React, designed to be fully responsive across various devices.
*   **Styling with TailwindCSS & Shadcn UI**: Utilizes TailwindCSS for utility-first styling and Shadcn UI for beautiful, accessible, and customizable components.
*   **Fast Refresh & Development**: Powered by Vite for blazing-fast development, Hot Module Replacement (HMR), and optimized builds.
*   **PWA Capabilities**: Implements Progressive Web App features, including an app manifest (`manifest.json`) and service worker for offline support and installability.
*   **View Transitions API**: Smooth page transitions using the experimental View Transitions API for a more fluid user experience.
*   **Client-side Routing**: Managed with `react-router-dom` for seamless navigation between pages (Home, About, Events, Projects, Team, Not Found).
*   **Global State Management**: Leverages `Zustand` for a lightweight and flexible global state store.
*   **Server State Management**: Uses `@tanstack/react-query` for efficient data fetching, caching, synchronization, and automatic background refetching.
*   **Accessibility (A11y)**: Built with accessibility in mind, supporting screen readers and keyboard navigation.
*   **Image Optimization**: Integrates `vite-imagetools` and `vite-plugin-lqip` for responsive images and low-quality image placeholders.
*   **Code Compression**: `vite-plugin-compression2` is used to optimize build output size with Brotli and Gzip.

### Backend (API Server)

*   **High-Performance API**: A lightweight and fast RESTful API built with `Elysia.js` (running on Bun).
*   **Authentication & Security**: Includes JWT Bearer authentication, Elysia-Helmet for various HTTP security headers (CSP, HSTS, X-Frame-Options), and `elysia-rate-limit` to prevent abuse.
*   **Observability**: Integrated with `OpenTelemetry` for distributed tracing, with configuration to export traces to `Jaeger` for monitoring and debugging.
*   **Structured Logging**: Utilizes `logixlysia` for comprehensive and customizable server-side logging.
*   **Utility Endpoints**: Provides endpoints for health checks, application status, version information, and API details.

### Shared Utilities

*   **Robust Class Utilities**: Includes `Redacted` for sensitive data handling, `ThreadPool` for managing web workers, `TimeManager` for robust timer control, and `Queue` for basic data structuring.
*   **Method Decorators**: A rich set of TypeScript decorators to enhance class methods with functionalities like:
    *   `@after`, `@before`: Execute code before or after a method call.
    *   `@bind`: Automatically bind `this` context to methods.
    *   `@debounce`, `@throttle`, `@throttleAsync`: Control method execution frequency.
    *   `@delay`: Introduce a delay before method execution.
    *   `@delegate`: Prevent duplicate async calls for the same arguments.
    *   `@execTime`: Measure method execution time.
    *   `@memoize`, `@memoizeAsync`: Cache method results for performance.
    *   `@observe`: Observe property changes.
    *   `@rateLimit`: Limit method call frequency.
    *   `@readonly`: Make a property read-only.

### Development & Testing

*   **Comprehensive Testing Suite**:
    *   **End-to-End (E2E) Testing**: `Cypress` and `Playwright` for cross-browser functional testing.
    *   **Unit Testing**: `Vitest` and `Jest` for individual component and utility function testing.
    *   **Component Testing**: `Storybook` provides an isolated environment for developing, documenting, and testing UI components.
*   **Linting & Formatting**: Enforced with `Biome`, `Stylelint`, and `Markdownlint` for consistent code style and quality.
*   **Dependency Management**: `Bun` is used as the primary package manager for speed and efficiency, complemented by `audit-ci` for security vulnerability checks.
*   **Automated CI/CD**: GitHub Actions workflows for linting, testing (Cypress, Playwright, CodeQL), and deployment to Firebase Hosting.
*   **Documentation Site**: A dedicated documentation site powered by `Rspress` within the `docs/client` directory, for detailed guides and API references.

## 🚀 Tech Stack

### Client-side
*   **Framework**: [React](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/) (using [Rolldown Vite adapter](https://github.com/web-infra-dev/rolldown))
*   **Styling**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
*   **State Management**: [Zustand](https://zustand-zustand.vercel.app/docs/introduction) (global store), [@tanstack/react-query](https://tanstack.com/query/latest/) (server state)
*   **Routing**: [React Router DOM](https://reactrouter.com/en/main)
*   **Animations**: [Motion](https://www.framer.com/motion/)
*   **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
*   **Internationalization**: `i18n` (implied, common for docs)
*   **Utilities**: `class-variance-authority`, `clsx`, `usehooks-ts`

### Backend (API Server)
*   **Framework**: [Elysia.js](https://elysiajs.com/)
*   **Runtime**: [Bun](https://bun.sh/)
*   **Observability**: [@elysiajs/opentelemetry](https://elysiajs.com/plugins/opentelemetry.html), `OpenTelemetry`, `Jaeger`
*   **Security**: `elysia-rate-limit`, `elysiajs-helmet`, `@elysiajs/bearer`, `@elysiajs/cors`
*   **Logging**: `logixlysia`
*   **Authentication**: `jsonwebtoken` (JWT)

### Shared / Utilities
*   **Functional Programming**: [Effect-TS](https://effect.website/docs/introduction)
*   **Data Structures**: `tinyqueue`
*   **Performance Tools**: `@jsheaven/perf`
*   **Type Utilities**: `@total-typescript/ts-reset`
*   **Custom Utilities**: `Redacted`, `ThreadPool`, `TimeManager`, `Queue`, `WorkerThread`, and a suite of custom decorators (`@after`, `@before`, `@memoize`, etc.)

### Testing
*   **E2E Testing**: [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/)
*   **Unit Testing**: [Vitest](https://vitest.dev/), [Jest](https://jestjs.io/)
*   **Component Documentation & Testing**: [Storybook](https://storybook.js.org/)
*   **Code Coverage**: `@vitest/coverage-v8`
*   **Linting**: [@biomejs/biome](https://biomejs.dev/), [Stylelint](https://stylelint.io/), [Markdownlint](https://github.com/DavidAnson/markdownlint)
*   **Security Audits**: [audit-ci](https://github.com/IBM/audit-ci)

### Documentation
*   **Static Site Generator**: [Rspress](https://rspress.dev/)

### Deployment
*   **Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting)
*   **Containerization**: [Docker](https://www.docker.com/)

---

## 🏗️ Project Structure

```
gdsc-fsc-gdg-fsc-website/
├── public/               # Static assets (images, fonts, PWA icons/manifest, robots.txt, sitemap.xml)
├── src/                  # Main application source code
│   ├── app.tsx           # Main React application component
│   ├── main.tsx          # React entry point
│   ├── components/       # Reusable React components (UI library, loaders, error boundaries)
│   │   └── ui/           # Shadcn UI components (accordion, alert, button, etc.)
│   ├── constants/        # Application-wide constants (about, app, home, team data)
│   ├── core/             # Core application logic and Zustand store setup
│   ├── hooks/            # Custom React hooks (e.g., use-mobile)
│   ├── layouts/          # Page layouts (e.g., PageLayout with navigation)
│   ├── lib/              # Utility functions for client-side (e.g., `cn` for Tailwind)
│   ├── pages/            # Top-level React pages (Home, About, Events, Projects, Team, NotFound)
│   ├── providers/        # React Context providers (Theme, Zustand, React Query)
│   ├── scripts/          # Client-side scripts (Schema.org, speculation rules)
│   ├── server/           # Backend-related client-side interfaces (builders, controllers, DTOs, mappers, services)
│   ├── stories/          # Storybook stories for internal components
│   └── styles/           # Global CSS styles (fonts.css)
├── shared/               # Shared utilities and reusable logic across client/server
│   ├── classes/          # Core utility classes (Error, Queue, Redacted, ThreadPool, TimeManager, Worker)
│   └── decorators/       # TypeScript method decorators (after, before, memoize, throttle, etc.)
│   └── utils/            # General utility functions (logger, fetcher, helpers, performance, task-exec)
├── server.ts             # Elysia.js backend API server entry point
├── docs/                 # Project documentation
│   └── client/           # Rspress-based documentation website source
│       └── docs/         # Markdown/MDX documentation content
├── tests/                # All testing configurations and test files
│   ├── cypress/          # Cypress E2E tests
│   ├── jest/             # Jest unit tests
│   ├── pw/               # Playwright E2E tests
│   └── vitest/           # Vitest unit/e2e tests
├── docker/               # Docker configuration (Dockerfile, docker-compose.yml)
├── .github/              # GitHub configurations (workflows, issue templates, contributing guidelines)
├── .storybook/           # Storybook configuration
├── package.json          # Project dependencies and scripts
└── ...                   # Configuration files for various tools (biome, bunfig, tsconfig, etc.)
```

## 📦 Installation (Local Development)

### Prerequisites

*   [Bun](https://bun.sh/docs/installation) (v1.2.17+) - Runtime and package manager
*   [Node.js](https://nodejs.org/en) (v22.6.0+) - For compatibility with some tools
*   [Docker](https://www.docker.com/get-started/) (optional, for Jaeger/Cloudflare worker setup)
*   A code editor (e.g., [VS Code](https://code.visualstudio.com/)) with recommended extensions for TypeScript, React, TailwindCSS, Biome, etc.

### Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GDSC-FSC/gdg-fsc-website.git
    cd gdsc-fsc-gdg-fsc-website
    ```

2.  **Install dependencies:**
    This project uses Bun as the package manager.
    ```bash
    bun install
    ```
    *Note: The `preinstall` script `bun ./bin/ts/database.gen.ts` might attempt to generate database-related files. If it fails due to missing dependencies or setup, it's configured to proceed (`|| true`).*

3.  **Build the application:**
    ```bash
    bun run build
    ```
    This will transpile TypeScript files and build the client-side application using Vite.

## 🏃‍♂️ Running the Application

This project has both a client-side (React + Vite) and a backend API (Elysia.js + Bun). They run as separate processes during development.

### 1. Development Mode (Client & Server)

The `dev` script in `package.json` primarily starts the Vite development server for the frontend. For a full development experience with the backend API, you'll need to run both concurrently.

*   **Start the frontend development server:**
    ```bash
    bun run dev
    # This will typically start on http://localhost:5173
    ```

*   **Start the backend API server:**
    Open a **new terminal** and run the Elysia.js server. By default, it runs on port `3000`.
    ```bash
    bun run server.ts
    # This will typically start on http://localhost:3000/api/v1
    # It also attempts to start a Jaeger container via Docker for tracing if Docker is running.
    ```
    *Note: The frontend (`vite.config.ts`) is configured with a proxy to `/api` that redirects requests to `http://localhost:3000` (where the Elysia server runs).*

### 2. Preview Production Build

After running `bun run build`, you can preview the static production build locally:
```bash
bun run preview
```

### 3. Docker Deployment (Development with Cloudflare Worker)

The `docker-compose.yml` is set up for a development environment using a Node.js image to run `bun run dev` (simulating a Cloudflare Worker environment, though it's still local).

1.  Ensure Docker is running.
2.  From the project root:
    ```bash
    docker-compose -f docker/docker-compose.yml up --build
    ```
    This will build and run the `cloudflare_worker` service, making the application available on `http://localhost:5173`.

---

## ⚙️ API Endpoints (Elysia.js Server)

The Elysia.js server exposes endpoints under the `/api/v1` prefix (base URL for local development: `http://localhost:3000/api/v1`). API documentation is available via Swagger.

### Swagger Documentation

Access the interactive API documentation at `http://localhost:3000/swagger`.

### Utility Endpoints

*   **GET /api/v1**: Welcome message.
*   **HEAD /api/v1**: Check API availability.
*   **OPTIONS /api/v1**: CORS preflight response.
*   **GET /api/v1/status**: Returns application uptime, memory usage, version, and environment.
*   **GET /api/v1/version**: Returns the current API version.
*   **GET /api/v1/info**: Provides contact and documentation URLs.
*   **GET /api/v1/health**: Simple health check, returns "ok" if the API is running.

### Authentication Endpoints

*   **POST /auth/register**: Registers a new user (generates an RSA key pair and returns a JWT).

### Protected Example Endpoint

*   **GET /api/v1/example**: An example endpoint that requires a valid JWT Bearer token.

---

## 🧪 Testing Strategy

The project employs a multi-faceted testing strategy to ensure high quality and reliability:

*   **Unit Tests**: Focused tests for individual functions, classes, and components, implemented with `Vitest` (`tests/vitest/unit`) and `Jest` (`tests/jest`).
*   **Integration Tests**: Verifies interactions between modules or services.
*   **End-to-End (E2E) Tests**: Simulates full user journeys across the application.
    *   **Cypress**: Located in `tests/cypress`, for browser-based E2E tests.
    *   **Playwright**: Located in `tests/pw`, for cross-browser E2E tests, including mobile device emulation.
*   **Component Testing**: `Storybook` is used for isolated component development, visual regression testing (via Chromatic), and interaction testing.
*   **Code Coverage**: Generated for unit tests to ensure adequate test coverage.
*   **Linting & Formatting**: Enforced at multiple levels (`Biome`, `Stylelint`, `Markdownlint`) to maintain consistent code style and identify potential issues.
*   **Security Audits**: `audit-ci` performs security checks on dependencies.

### Available Testing Commands

```bash
# Run all tests (Vitest, Cypress, Playwright, Storybook)
bun run test:all

# Vitest (Unit/E2E for server)
bun run test:vitest       # Run all Vitest tests once
bun test                  # Run Vitest in watch mode (default for `bun test`)

# Cypress (E2E)
bun run test:cypress      # Run Cypress E2E tests headlessly
bunx cypress open         # Open Cypress UI for interactive E2E testing
bunx cypress run --component # Run Cypress component tests

# Playwright (E2E)
bun run test:playwright   # Run Playwright E2E tests headlessly
bunx playwright test --ui # Open Playwright UI for interactive E2E testing

# Storybook
bun run storybook         # Start Storybook development server
bun run build:storybook   # Build static Storybook
bun run test:storybook    # Run Storybook interaction tests

# Linting
bun run lint              # Run Biome, Stylelint, and CSS HSL/HEX checks
bun run lint:md           # Lint Markdown files
```

For more detailed information on testing, refer to the [TESTING.md](./TESTING.md) document.

---

## 📝 Documentation

This project includes a dedicated documentation site built with [Rspress](https://rspress.dev/).

To run the documentation site locally:

```bash
cd docs/client
bun install
bun run dev
# This will typically start the docs site on http://localhost:5174
```

You can find the documentation content in `docs/client/docs/`.

---

## 🤝 Contributing

We welcome contributions to the GDG on Campus Farmingdale State College Website!

Please read our [CONTRIBUTING.md](./.github/CONTRIBUTING.md) guide for detailed instructions on:
*   Code of Conduct
*   Reporting Issues
*   Sending Pull Requests (including conventional commit guidelines, draft PRs, granular PRs, and review process)

We follow the [All Contributors](https://allcontributors.org) specification.

---

## 📜 License

This project is licensed under the [MIT License](./server/LICENSE).

---

## 🧑‍💻 Authors & Contributors

This project follows the [All Contributors](https://allcontributors.org) specification.

### 🚀 Core Team

*   **Mike Odnis** – Lead Engineer, Everything – [https://mikeodnis.dev](https://mikeodnis.dev) – @WomB0ComB0

### 📝 Documentation

*   **Mike Odnis** – Everything – @WomB0ComB0

### 🎉 Community Contributors

A huge shout‑out to everyone who's made bug fixes, feature requests, issue triage—check the [full contributors list][GitHub-Contributors].

[GitHub-Contributors]: https://github.com/GDSC-FSC/gdg-fsc-website/graphs/contributors
