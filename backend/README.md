# URL Shortener Backend

<div align="center">

[![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-blue.svg)](https://www.postgresql.org/)
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

## Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Testing:** Jest
- **Documentation:** Swagger/OpenAPI

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

- Node.js (v16 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

## Quick Start

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

The API will be available at `http://localhost:3000`

## API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:3000/api`
- OpenAPI JSON: `http://localhost:3000/api-json`

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

```bash
# Build
npm run build

# Start production server
npm run start:prod
```

## Environment Variables

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/url_shortener
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
