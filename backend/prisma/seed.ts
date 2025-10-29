import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main(){
  await prisma.movie.createMany({
    data: [
      { title: 'Inception', type: 'Movie', director: 'Christopher Nolan', budget: '$160M', location: 'LA, Paris', duration: '148 min', year: '2010' },
      { title: 'Breaking Bad', type: 'TV Show', director: 'Vince Gilligan', budget: '$3M/ep', location: 'Albuquerque', duration: '49 min/ep', year: '2008-2013' }
    ]
  })
}
main().catch(e=>{console.error(e); process.exit(1)})
