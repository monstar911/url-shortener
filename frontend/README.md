# URL Shortener Frontend

<div align="center">

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-purple.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.0.0-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0.0-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive frontend for URL shortening service with real-time analytics.

</div>

## Overview

This frontend application provides a user-friendly interface for the URL Shortener service. Built with React and TypeScript, it offers a seamless experience for shortening URLs and tracking their performance.

## Features

- 🔗 Instant URL shortening
- 👤 User authentication
- 🎨 Modern, responsive UI
- 📱 Mobile-first design
- 🔄 Real-time updates
- 🐳 Docker support

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS Modules
- **State Management:** React Query
- **Routing:** React Router
- **Form Handling:** React Hook Form
- **Containerization:** Docker
- **Web Server:** Nginx

## Project Structure

```
src/
├── components/     # Reusable UI components
├── services/       # API integration services
├── assets/         # Static assets
├── constants.ts    # Application constants
├── App.tsx         # Root component
├── main.tsx        # Application entry point
├── Redirect.tsx    # URL redirection handler
└── NotFound.tsx    # 404 page component
```

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Docker

## Quick Start

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

### Docker Deployment

1. Build the Docker image:

   ```bash
   docker build -t url-shortener-frontend .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:3000 \
     -e VITE_API_URL=http://localhost:3000 \
     url-shortener-frontend
   ```

3. Or use docker-compose (recommended):
   ```bash
   docker-compose up frontend
   ```

## Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=URL Shortener
```

## Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write unit tests for new features
- Follow the established code style

## Building for Production

### Local Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Docker Build

```bash
# Build and run with docker-compose
docker-compose up -d frontend
```

## Docker Configuration

The service includes a multi-stage Dockerfile with Nginx for serving the production build:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
# ... build configuration

# Production stage
FROM nginx:alpine
# ... nginx configuration
```

### Nginx Configuration

The application uses a custom Nginx configuration for optimal performance:

```nginx
server {
    listen 3000;
    # ... nginx settings
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
