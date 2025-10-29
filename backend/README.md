# Backend (Node + Express + Prisma + Zod)

Quick setup:
1. Create a MySQL database and set `DATABASE_URL` environment variable, e.g.
   export DATABASE_URL="mysql://user:pass@localhost:3306/favmedia"
2. Install deps: `npm install`
3. Initialize Prisma client and migrate:
   - `npx prisma migrate dev --name init`
   - `npx prisma db seed --preview-feature` (or run `ts-node prisma/seed.ts`)
4. Start dev server: `npm run dev`
5. API endpoints:
   - POST /api/movies
   - GET /api/movies?page=0&limit=10
   - GET /api/movies/:id
   - PUT /api/movies/:id
   - DELETE /api/movies/:id

Notes:
- Uses Zod for request validation (see src/validators).
- Uses Prisma as ORM (see prisma/schema.prisma).
