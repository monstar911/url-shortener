# URL Shortener Backend

<div align="center">

[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-blue.svg)](https://www.postgresql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.0.0-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0.0-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A robust REST API service for URL shortening and analytics tracking.

</div>

## Overview

This backend service provides a secure and scalable API for URL shortening operations. Built with NestJS and TypeScript, it offers features like URL shortening, redirection, analytics tracking, and user management.

## Features

- 🔗 URL shortening and redirection
- 👤 User authentication and authorization
- 📊 URL analytics and tracking
- 🔒 Rate limiting and security
- 📝 API documentation with Swagger
- 🧪 Comprehensive test coverage
- 🐳 Docker support

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Testing:** Jest
- **Documentation:** Swagger/OpenAPI
- **Containerization:** Docker

## Project Structure

```
src/
├── auth/           # Authentication module
├── user/           # User management
├── url/            # URL shortening logic
├── interceptors/   # Request/Response interceptors
├── assets/         # Static assets
├── app.module.ts   # Main application module
└── main.ts         # Application entry point
```

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn
- Docker

## Quick Start

### Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3001`

### Docker Deployment

1. Build the Docker image:

   ```bash
   docker build -t url-shortener-backend .
   ```

2. Run the container:

   ```bash
   docker run -p 3001:3001 \
     -e DATABASE_URL=postgresql://postgres:postgres@db:5432/url_shortener \
     -e JWT_SECRET=your_jwt_secret \
     -e JWT_EXPIRATION=1d \
     url-shortener-backend
   ```

3. Or use docker-compose (recommended):
   ```bash
   docker-compose up backend
   ```

## API Documentation

Once the server is running, visit:

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Production Deployment

### Local Build

```bash
# Build
npm run build

# Start production server
npm run start:prod
```

### Docker Build

```bash
# Build and run with docker-compose
docker-compose up -d backend
```

## Environment Variables

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/url_shortener
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
```

## Docker Configuration

The service includes a multi-stage Dockerfile for optimized production builds:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
# ... build configuration

# Production stage
FROM node:20-alpine
# ... production configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
