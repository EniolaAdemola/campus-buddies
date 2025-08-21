# Lisio Buddy

A modern study buddy platform that connects students to help them achieve their academic goals together.

## About the Project

Lisio Buddy is a comprehensive student platform designed to help learners connect, collaborate, and succeed in their studies. Whether you're looking for study partners, need help with specific subjects, or want to form study groups, Lisio Buddy makes it easy to find like-minded students and build meaningful academic relationships.

### Key Features

- **Student Profiles**: Create detailed profiles showcasing your academic interests and subjects
- **Study Group Formation**: Find and create study groups for specific courses or topics
- **Peer Matching**: Connect with students who complement your learning style and goals
- **Resource Sharing**: Share study materials, notes, and resources with your study partners
- **Goal Tracking**: Set and track academic goals with accountability partners
- **Event Planning**: Organize study sessions, group meetings, and academic events

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18 or higher) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or bun (package manager)

### Local Setup

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone https://github.com/EniolaAdemola/campus-buddies.git

# Step 2: Navigate to the project directory
cd campus-buddies

# Step 3: Install dependencies
npm install
# or if you're using bun
bun install

# Step 4: Start the development server
npm run dev
# or if you're using bun
bun run dev
```

The application will be available at `http://localhost:8080`

## Tech Stack

This project is built with modern web technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router Dom
- **State Management**: React Query (TanStack Query)
- **Backend**: Supabase (Database & Authentication)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run build:dev` - Builds the app in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── FeatureCard.tsx
│   ├── Navigation.tsx
│   └── StepCard.tsx
├── pages/              # Page components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   ├── Signup.tsx
│   └── Support.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact:

- GitHub: [@EniolaAdemola](https://github.com/EniolaAdemola)
- Project Repository: [campus-buddies](https://github.com/EniolaAdemola/campus-buddies)
