import React from 'react'
import MovieForm from '../components/MovieForm'
import MovieTable from '../components/MovieTable'

export default function Home(){
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Favorites — Movies & TV Shows</h1>
      <MovieForm/>
      <MovieTable/>
    </div>
  )
}
