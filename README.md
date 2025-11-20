# Mozartiade Lab

A modern web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Recoil
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Validation**: Zod
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mozartiade-lab
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database connection string:
```
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

4. Set up the database:
```bash
npm run prisma:generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Client-side providers
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Recoil state management
│   ├── atoms/
│   └── selectors/
├── styles/               # Global styles
└── types/                # TypeScript types
```

## Design System

See [claude.md](./claude.md) for detailed design system guidelines and development best practices.

### Key Design Principles

- **Modern Minimalist**: Clean, spacious layouts with subtle animations
- **Color Scheme**: Primary (Blue), Secondary (Violet), Accent (Emerald)
- **Typography**: Inter for headings, system fonts for body text
- **Spacing**: 8px grid system
- **Components**: Glass morphism effects with backdrop blur

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client

## Database Schema

The initial schema includes a User model. You can modify `prisma/schema.prisma` to add more models.

After making changes to the schema:
```bash
npx prisma generate
npx prisma db push
```

## Development Workflow

1. Create feature branch
2. Develop with type safety (TypeScript + Zod)
3. Follow design system guidelines in claude.md
4. Test functionality
5. Create pull request

## Contributing

Please refer to [claude.md](./claude.md) for:
- Code structure and naming conventions
- Component patterns
- Design system usage
- Best practices

## License

MIT

## Support

For issues and questions, please open an issue in the GitHub repository.
