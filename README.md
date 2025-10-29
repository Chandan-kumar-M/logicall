# Assignment — Favorite Movies & TV Shows (scaffold)


1. Backend:
   - cd backend
   - set DATABASE_URL environment variable (MySQL)
   - npm install
   - npx prisma generate
   - npx prisma migrate dev --name init
   - npm run dev
2. Frontend:
   - cd frontend
   - npm install
   - npm run dev
   - Configure Vite proxy (or run backend on port 4000 and set axios baseURL to http://localhost:4000)
