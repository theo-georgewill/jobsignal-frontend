# Jobsignal Frontend

A responsive React frontend for the Remote Jobs Aggregator platform. It provides a searchable dashboard where users can discover, filter, save, and track global remote software engineering jobs.

## Overview

The frontend is designed as an independent service for clean separation from the backend API. This allows faster UI iteration, separate deployments, and easier scaling.

## Responsibilities

* Browse and search jobs
* Advanced filtering (stack, seniority, timezone, salary, source)
* Save jobs and track applications
* Dashboard analytics
* Authentication flows
* Responsive user interface

## Tech Stack

* React
* TypeScript
* Vite
* React Query / state management
* UI component system
* Tailwind CSS 

## Key Features

* Fast searchable jobs dashboard
* Advanced filters for remote opportunities
* Personalized job discovery experience
* Saved jobs management
* Application tracker
* Mobile-friendly responsive layout
* Authentication and account flows
* Fresh jobs prioritization

## Local Development

```bash
cd frontend
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Testing

```bash
npm run test
```

## Linting

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=
```

## Suggested Project Structure

```text
src/
  api/
  components/
  hooks/
  layouts/
  routes/
  views/
  types/
```

## Product Vision

Deliver the best private job intelligence dashboard for software engineers seeking global remote opportunities.

## Status

Active development.
