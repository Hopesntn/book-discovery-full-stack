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
