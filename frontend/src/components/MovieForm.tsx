import React, { useState } from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

type Form = {
  title: string
  type: 'Movie' | 'TV Show'
  director: string
  budget?: string
  location?: string
  duration?: string
  year?: string
}

export default function MovieForm() {
  const [form, setForm] = useState<Form>({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year: '',
  })
  const [saving, setSaving] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await axios.post('/api/movies', form)
      alert('Saved successfully!')
      setForm({
        title: '',
        type: 'Movie',
        director: '',
        budget: '',
        location: '',
        duration: '',
        year: '',
      })
    } catch (err: any) {
      alert(err?.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add Movie / TV Show
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            required
            placeholder="Enter title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as any })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Movie</option>
            <option>TV Show</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Director</label>
          <input
            required
            placeholder="Enter director"
            value={form.director}
            onChange={(e) => setForm({ ...form, director: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Budget</label>
          <input
            placeholder="$160M"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            placeholder="LA, Paris"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Duration</label>
          <input
            placeholder="148 min"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">Year / Time</label>
          <input
            placeholder="2010"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          disabled={saving}
          className={`px-5 py-2 rounded-md text-white font-medium transition-colors ${
            saving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {saving ? 'Saving...' : 'Add Entry'}
        </button>
      </div>
    </form>
  )
}
