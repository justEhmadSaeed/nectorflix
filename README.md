# NECTORFLIX 🍿

This project provides an interface to search and bookmark movies, for managing watchlists using a many-to-many relationship between movies and watchlists. It leverages Prisma as an ORM for interacting with a SQLite database, environment variables for secure configuration, Next.js as a server-side rendering (SSR) framework, NextUI for design components and Zustand for state management within the frontend.

## Prerequisites:

Node.js and npm (or yarn) installed on your system.
Basic understanding of JavaScript, Prisma, SQLite, Next.js, and Zustand.
Setup:

### Clone the Repository:

```bash
git clone git@github.com:justEhmadSaeed/nectorflix.git
cd nectorflix
```

## Install Dependencies:

```bash
npm install # or yarn install
```

## Create env files

Create a .env.local for Next.js and a .env File for Prisma DB URL in your project root directory.

Add the following environment variables, replacing placeholders with your actual values:

```bash
# .env
DATABASE_URL=file:./dev.db # Path to your SQLite database file
```

```bash
# .env.local
TMDB_API_KEY="TMDB_API_KEY" # your tmdb api key
```

## Run Database Migrations:

```bash
npx prisma migrate dev # Replace 'dev' with 'prod' if deploying to production
npx prisma generate
```

## Running the Application:

Start the Development Server:

```bash
npm run dev # or yarn dev
```

This will start the Next.js development server, typically accessible at http://localhost:3001 by default.

By following these steps, you'll have a locally running application that demonstrates the use of Prisma, SQLite, Next.js, NextUI and Zustand.

Note: The `prisma/dev.db` file is committed intentionally to use it as a dump. Feel free to delete it.

## Deployment (Optional):

Refer to Next.js documentation for deployment instructions based on your preferred platform (e.g., Vercel, Netlify).
Ensure environment variables are set up appropriately in your deployment environment.

Use the following custom build command:

```bash
npm run vercel-build # or yarn vercel-build
```

Feel free to contact me if I unintentionally missed something.
