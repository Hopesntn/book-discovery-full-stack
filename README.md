# WEB422 - Assignment 3

## Open Library Books Application

## Developer

| Name | Role |
| --- | --- |
| Fabricio Alejandro Ortiz Fiallos | Full-stack development, API integration, authentication, and documentation |

## Project Description

This project is a full-stack book discovery application created for WEB422 Assignment 3. It uses Next.js and the Open Library API to let registered users search for books, view detailed book information, and maintain a personal favourites list.

The application includes its own user API. User accounts and favourites are stored in MongoDB Atlas, passwords are hashed before storage, and protected requests are authenticated with JSON Web Tokens (JWT). The frontend and API are contained in one Next.js project and can be deployed together on Vercel.

## Theme

Book discovery and personal library management using Open Library data, secure account authentication, and persistent MongoDB favourites.

## Features

- Registers users with password confirmation and duplicate-user validation.
- Hashes passwords with `bcryptjs` before saving them.
- Authenticates users and issues signed JWT access tokens.
- Protects favourites API routes with Passport JWT middleware.
- Guards application pages that require authentication.
- Searches Open Library by author, title, subject, language, and publication year.
- Displays paginated book search results.
- Displays detailed information for individual Open Library works.
- Adds and removes books from a user's favourites.
- Saves a separate favourites list for every registered user.
- Restores favourites from MongoDB after a page refresh or login.
- Updates the navigation based on the current authentication state.
- Supports account logout by removing the stored access token.
- Provides responsive layouts using React Bootstrap.
- Runs the frontend and serverless API from the same Next.js application.

## Project Structure

```text
assignment_1/
|
|-- components/
|   |-- BookCard.js             # Displays a favourite book summary
|   |-- BookDetails.js          # Displays book data and favourite controls
|   |-- Layout.js               # Shared application layout
|   |-- MainNav.js              # Authentication-aware navigation bar
|   |-- PageHeader.js           # Reusable page heading component
|   |-- RouteGuard.js           # Restricts protected pages
|
|-- lib/
|   |-- server/
|   |   |-- auth.js             # Passport JWT configuration
|   |-- authenticate.js         # Browser token and account utilities
|   |-- user-service.js         # MongoDB user and favourites operations
|   |-- userData.js             # Client favourites API functions
|
|-- pages/
|   |-- api/user/
|   |   |-- favourites/
|   |   |   |-- [id].js         # Add or remove a favourite
|   |   |   |-- index.js        # Get the current user's favourites
|   |   |-- login.js            # User login API route
|   |   |-- register.js         # User registration API route
|   |-- works/
|   |   |-- [workId].js         # Dynamic book details page
|   |-- _app.js                 # Global providers, layout, and route guard
|   |-- _document.js            # Custom HTML document
|   |-- about.js                # Developer information page
|   |-- books.js                # Search results page
|   |-- favourites.js           # Saved books page
|   |-- index.js                # Book search page
|   |-- login.js                # Login page
|   |-- register.js             # Registration page
|
|-- styles/
|   |-- globals.css             # Global application styles
|
|-- .env.example                # Required environment variable template
|-- .gitignore                  # Git exclusions for secrets and build files
|-- eslint.config.mjs           # ESLint configuration
|-- jsconfig.json               # JavaScript path alias configuration
|-- next.config.mjs             # Next.js and remote image configuration
|-- package.json                # Scripts and dependencies
|-- pnpm-lock.yaml              # Locked dependency versions
|-- store.js                    # Shared Jotai favourites atom
|-- README.md
```

## External Data

| Source | Purpose |
| --- | --- |
| Open Library Search API | Searches for books using the form criteria |
| Open Library Works API | Retrieves detailed information for a selected work |
| Open Library Covers API | Supplies book cover images |
| MongoDB Atlas | Stores registered users and their favourites |

## API Routes

| Method | Route | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/user/register` | Public | Creates a user account |
| `POST` | `/api/user/login` | Public | Validates credentials and returns a JWT |
| `GET` | `/api/user/favourites` | JWT required | Returns the current user's favourites |
| `PUT` | `/api/user/favourites/:id` | JWT required | Adds a work ID to favourites |
| `DELETE` | `/api/user/favourites/:id` | JWT required | Removes a work ID from favourites |

Protected requests use the following authorization header format:

```http
Authorization: JWT YOUR_TOKEN
```

## MongoDB User Data

Each MongoDB user document contains the following application data:

| Field | Purpose |
| --- | --- |
| `userName` | Unique account name |
| `password` | Bcrypt password hash |
| `favourites` | Array of saved Open Library work IDs |

Plaintext passwords are never stored in MongoDB.

## Dependencies

| Dependency | Purpose |
| --- | --- |
| Next.js 15 | Application framework, routing, API routes, and production builds |
| React 19 | User interface components and state rendering |
| React Bootstrap | Responsive interface components |
| Bootstrap | Base styling and layout utilities |
| React Hook Form | Login, registration, and search form management |
| Jotai | Shared favourites state |
| SWR | Open Library data fetching and caching |
| Mongoose | MongoDB schema and database operations |
| bcryptjs | Secure password hashing and comparison |
| jsonwebtoken | JWT creation during login |
| passport | Authentication middleware |
| passport-jwt | JWT extraction and validation strategy |
| jwt-decode | Client-side token payload reading |
| ESLint | Source-code validation |



## Local Installation

Install the project dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in a browser. Unauthenticated users can access `/login`, `/register`, and `/about`. Other application pages redirect to `/login` until a valid account is authenticated.

## Available Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server |
| `pnpm lint` | Runs ESLint across the project |
| `pnpm build` | Creates an optimized production build |
| `pnpm start` | Runs the completed production build |

## Main Application Flow

1. A user registers with a unique user name and matching passwords.
2. The API hashes the password and saves the account in MongoDB Atlas.
3. The user logs in with the registered credentials.
4. The API signs a JWT containing the user's ID and user name.
5. The browser stores the token in local storage.
6. The application retrieves the user's existing favourites from MongoDB.
7. The user searches Open Library and opens a book details page.
8. Adding or removing a favourite sends a protected API request with the JWT.
9. MongoDB updates the user's favourites and returns the latest list.
10. The route guard reloads the saved list when the application is refreshed.

## Authentication and Route Protection

The public application paths are:

- `/login`
- `/register`
- `/about`

The search page, search results, book details, and favourites page require a valid non-expired JWT. If authentication fails, the route guard redirects the visitor to `/login`.

The favourites API routes independently validate the JWT with Passport. Client-side route protection does not replace server-side API protection.

## MongoDB Atlas Setup

1. Create a MongoDB Atlas project and cluster.
2. Create a database user with permission to read and write application data.
3. Copy the application connection string into `MONGO_URL`.
4. Set `MONGO_DB_NAME` to `users` or another selected database name.
5. Add the development machine's IP address to Atlas Network Access.
6. For Vercel, configure Atlas network access for Vercel's outbound connections. A common student-project configuration is `0.0.0.0/0`, combined with strong database credentials.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the GitHub repository as a new Vercel project.
3. Keep the standard Next.js framework and build settings.
4. Add `MONGO_URL`, `MONGO_DB_NAME`, `JWT_SECRET`, and `NEXT_PUBLIC_API_URL` under Vercel Environment Variables.
5. Use `/api/user` for `NEXT_PUBLIC_API_URL` because the API is deployed in the same project.
6. Deploy the project and test registration, login, favourites, refresh persistence, and logout.

### Deployment Link

Add the completed Vercel URL here:

```text
https://your-project-name.vercel.app
```

## Security Notes

- Never commit `.env` or a MongoDB connection string containing real credentials.
- Generate a long, random `JWT_SECRET` for production.
- Rotate credentials immediately if they are accidentally exposed.
- Keep MongoDB database permissions limited to what the application needs.
- Passwords are hashed with bcrypt before database storage.
- Protected API routes validate JWTs independently of the browser route guard.

## Assignment Requirements

The project implements the main WEB422 Assignment 3 requirements:

- A MongoDB-backed user API.
- User registration and login routes.
- JWT generation and Passport JWT validation.
- Protected get, add, and remove favourites routes.
- Authentication and user-data utility libraries.
- Login and registration pages with error handling.
- MongoDB-backed favourites state.
- A route guard for protected application pages.
- Authentication-aware navigation and logout.
- Vercel-compatible environment configuration.

## Verification

Before deployment, verify the project with:

```bash
pnpm lint
pnpm build
```

Both commands should finish successfully. Database-backed functionality also requires a valid Atlas connection string and an allowed network connection.

## Course Info

| Item | Information |
| --- | --- |
| Course | WEB422 |
| Assignment | Assignment 3 |
| Project | Open Library Books Application |
| Student | Fabricio Alejandro Ortiz Fiallos |
| Student ID | 120220249 |
| Submission Deadline | August 9, 2026 at 11:59 PM |
| Assignment Value | 10% |
