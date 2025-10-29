import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

type Item = {
  id: number;
  title: string;
  type: string;
  director: string;
  budget?: string;
  location?: string;
  duration?: string;
  year?: string;
};

export default function MovieTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<Partial<Item>>({});
  const loadingRef = useRef(false);

  const load = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    try {
      const res = await axios.get(`/api/movies?page=${page}&limit=10`);
      const data: Item[] = res.data;
      if (data.length === 0) setHasMore(false);
      setItems((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    } finally {
      loadingRef.current = false;
    }
  }, [page, hasMore]);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        load();
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [load]);

  async function remove(id: number) {
    if (!confirm("Delete this record?")) return;
    await axios.delete("/api/movies/" + id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function startEdit(item: Item) {
    setEditing(item);
    setForm(item);
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    try {
      await axios.put(`/api/movies/${editing.id}`, form);
      setItems((prev) =>
        prev.map((m) => (m.id === editing.id ? { ...m, ...form } as Item : m))
      );
      setEditing(null);
      alert("Updated successfully");
    } catch (err: any) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Director</th>
            <th className="p-2 text-left">Budget</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Duration</th>
            <th className="p-2 text-left">Year/Time</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{it.title}</td>
              <td className="p-2">{it.type}</td>
              <td className="p-2">{it.director}</td>
              <td className="p-2">{it.budget}</td>
              <td className="p-2">{it.location}</td>
              <td className="p-2">{it.duration}</td>
              <td className="p-2">{it.year}</td>
              <td className="p-2">
                <button
                  onClick={() => startEdit(it)}
                  className="text-sm text-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(it.id)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!hasMore && (
        <div className="p-4 text-center text-gray-500">No more records</div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={saveEdit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg grid gap-3"
          >
            <h2 className="text-xl font-semibold mb-2">Edit Record</h2>
            <input
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="p-2 border rounded"
            />
            <input
              value={form.director || ""}
              onChange={(e) => setForm({ ...form, director: e.target.value })}
              placeholder="Director"
              className="p-2 border rounded"
            />
            <input
              value={form.budget || ""}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              placeholder="Budget"
              className="p-2 border rounded"
            />
            <input
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className="p-2 border rounded"
            />
            <input
              value={form.duration || ""}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="Duration"
              className="p-2 border rounded"
            />
            <input
              value={form.year || ""}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="Year/Time"
              className="p-2 border rounded"
            />
            <div className="flex justify-end space-x-3 mt-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
