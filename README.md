# Full-Stack book discovery application

## Open Library Books Application

## Developer

| Name | Role |
| --- | --- |
| Fabricio Alejandro Ortiz Fiallos | Full-stack development, API integration, authentication, and documentation |

## Project Description

This project is a full-stack book discovery application. It uses Next.js and the Open Library API to let registered users search for books, view detailed book information, and maintain a personal favourites list.

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

## Local Installation

Install the project dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```
