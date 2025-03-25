# URL Shortener

<div align="center">

[![Backend](https://img.shields.io/badge/Backend-NestJS-red)](backend/)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](frontend/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A full-stack URL shortening service with analytics tracking

</div>

## Overview

This monorepo contains both the frontend and backend components of the URL Shortener service. The project provides a complete solution for URL shortening with real-time analytics and user management.

## Components

### [Backend](backend/)

- Built with NestJS and TypeScript
- RESTful API with Swagger documentation
- PostgreSQL database with TypeORM
- JWT authentication
- Analytics tracking
- Rate limiting

### [Frontend](frontend/)

- React 18 with TypeScript
- Modern, responsive UI
- Real-time analytics dashboard
- Dark/Light mode support
- Mobile-first design

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Backend
   cp backend/.env.example backend/.env

   ```
4. Start the services:

   ```bash
   # Backend
   cd backend
   npm run start:dev

   # Frontend (in a new terminal)
   cd frontend
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`
The backend API will be available at `http://localhost:3001`

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
