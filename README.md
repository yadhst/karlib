# Karlib [WIP]

Karlib is a web-based project designed to provide a comprehensive library management system. This project aims to preserve **written works** created by MA students of Islamic Unity Boarding School 112 Bogor as their final assignment.

## Features

- Read written works in PDF format
- Bookmark written works
- View reading history
- Explore & search page
- User roles & authentication system (RBAC/ABAC)
- Admin Dashboard to manage written works
- Comment on written works

## To Do

- [x] Setup project with [Next.js](https://nextjs.org/)
- [x] Setup [Prettier](https://prettier.io/)
- [x] Setup [Tailwind CSS](https://tailwindcss.com/) and [shadcn-ui](https://ui.shadcn.com/)
- [x] Setup database with [Turso](https://turso.tech/) and [Drizzle ORM](https://orm.drizzle.team/)
- [ ] Create database schema with Drizzle
  - [x] Users
  - [x] Works
  - [x] Bookmarks
  - [x] History
  - [ ] Comments
- [x] Setup [UploadThing](https://uploadthing.com/) for file uploads
- [x] Implement authentication system with [NextAuth](https://authjs.dev/)
- [x] Implement RBAC system for authorization
- [ ] Create Server Action endpoints with [Next Safe Action](https://next-safe-action.dev/) for:
  - [ ] Authentication (sign in and sign out)
  - [ ] User (retrieve and update)
  - [ ] Work (create, retrieve, update, and delete)
  - [ ] Bookmark (create, retrieve, and delete)
  - [ ] History (create, retrieve, update, and delete)
- [ ] Setup middleware to restrict access to the following pages:
  - [ ] Bookmark page (authenticated users only)
  - [ ] History page (authenticated users only)
  - [ ] Dashboard page (admin and consultant only)
- [x] Implement theme-mode system with [next-themes](https://www.npmjs.com/package/next-themes)
- [x] Create root layout for most pages
  - [x] Create navbar component
  - [x] Create footer component
- [ ] Create dashboard page
  - [ ] Create header section
  - [ ] Create statistics tab
  - [ ] Create data manager tab
  - [ ] Create user manager tab
- [ ] Create read page
- [ ] Create bookmark page
- [ ] Create history page
- [ ] Create explore page
  - [ ] Create header section
  - [ ] Implement search system
  - [ ] Implement sort and filtering system
  - [ ] Show all written works
  - [ ] Implement pagination system
- [ ] Create home page
  - [ ] Create hero section
  - [ ] Create about section
  - [ ] Create explore categories section
  - [ ] Create recent works section
  - [ ] Create discovery section
- [ ] Create about page
  - [ ] Create header section
  - [ ] Create about section
- [ ] Create an error page
- [ ] Create a "Not Found" page
- [ ] Implement SEO

## Setup

### System Requirements

- [Node.js >= 20](https://nodejs.org/)
- macOS, Windows (including WSL), and Linux are supported.

### How to Setup the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yadhst/karlib.git
   ```
2. Navigate to the project directory:
   ```bash
   cd karlib
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Usage

Once the server is running, open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
