# Cravinz - Food Discovery Platform

A collaborative food discovery platform built with Next.js, Prisma, and Tailwind CSS.

## Features

- User authentication and profile management
- Restaurant discovery with swipe interface
- Personalized food recommendations
- Social features (reviews, comments, following)
- Location-based restaurant search
- Curated food packs

## Tech Stack

- **Framework**: Next.js 14
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with shadcn/ui
- **Maps**: Leaflet
- **File Storage**: Cloudinary
- **AI/Recommendations**: Hugging Face

## Project Structure

```
cravinz/
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # React components
│   │   │   ├── common/     # Shared components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── restaurant/ # Restaurant-related components
│   │   │   └── ui/         # UI components (shadcn)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Frontend utilities
│   │   │   ├── api/        # API client functions
│   │   │   ├── utils/      # Helper functions
│   │   │   └── types/      # TypeScript types
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
│
├── backend/                # Backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript types
│   └── prisma/             # Database schema and migrations
│
├── shared/                 # Shared code between frontend and backend
│   ├── constants/          # Shared constants
│   ├── types/              # Shared TypeScript types
│   └── utils/              # Shared utility functions
│
└── tests/                  # Test files
    ├── frontend/           # Frontend tests
    └── backend/            # Backend tests
```

## Clean Code Principles

1. **Separation of Concerns**
   - Frontend and backend code are completely separated
   - Each component has a single responsibility
   - Business logic is isolated in services

2. **Code Organization**
   - Related code is grouped together
   - Clear folder structure
   - Consistent file naming

3. **Type Safety**
   - TypeScript for both frontend and backend
   - Shared types between frontend and backend
   - Strict type checking

4. **Code Reusability**
   - Common components in shared folders
   - Utility functions for repeated operations
   - Custom hooks for shared logic

5. **Testing**
   - Unit tests for utilities and services
   - Integration tests for API endpoints
   - Component tests for UI elements

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cravinz.git
cd cravinz
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```
Edit the `.env` files with your configuration values.

4. Set up the database:
```bash
cd backend
npx prisma migrate dev
```

5. Run the development servers:
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Environment Setup

### Backend Environment Variables
Create a `.env` file in the `backend` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cravinz?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server
PORT=3001
NODE_ENV="development"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"
```

### Frontend Environment Variables
Create a `.env.local` file in the `frontend` directory with the following variables:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
``` 