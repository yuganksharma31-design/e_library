"use client";

import { useState } from "react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Uploaded Successfully");
        e.target.reset();
      } else {
        alert(data.error);
      }
    } catch {
      alert("Upload failed");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] py-20 px-6">
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 items-center">

        {/* LEFT */}
        <div>
          <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
            Administration
          </div>

          <h1 className="mt-6 text-5xl lg:text-7xl font-bold text-[#1C1C1C] leading-tight">
            Upload Books &
            <br />
            Manuscripts
          </h1>

          <p className="mt-8 text-lg leading-9 text-stone-600 max-w-xl">
            Manage the digital archive and preserve rare books and manuscripts
            for future generations.
          </p>

          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
            className="
            mt-12
            rounded-[40px]
            shadow-2xl
            h-[400px]
            w-full
            object-cover
            "
          />
        </div>

        {/* FORM */}
        <div className="rounded-[40px] bg-white p-10 shadow-2xl border border-[#E8D9B5]">

          <h2 className="text-4xl font-bold text-[#1C1C1C] mb-10">
            Admin Upload Panel
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">

            <input
              type="text"
              name="title"
              placeholder="Book / Manuscript Title"
              required
              className="w-full rounded-2xl border p-5 outline-none"
            />

            <input
              type="text"
              name="creator"
              placeholder="Creator / Author"
              required
              className="w-full rounded-2xl border p-5 outline-none"
            />

            <select
              name="type"
              className="w-full rounded-2xl border p-5 outline-none"
            >
              <option value="book">
                📚 Book
              </option>

              <option value="manuscript">
                📜 Manuscript
              </option>
            </select>

            <div>
              <label className="block mb-3 font-semibold text-[#98003A]">
                Cover Image
              </label>

              <input
                type="file"
                name="cover"
                accept="image/*"
                required
                className="w-full rounded-xl border p-4"
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold text-[#98003A]">
                PDF Upload
              </label>

              <input
                type="file"
                name="pdf"
                accept=".pdf"
                required
                className="w-full rounded-xl border p-4"
              />
            </div>

            <button
              disabled={loading}
              className="
              w-full
              rounded-full
              bg-[#98003A]
              py-5
              text-lg
              font-semibold
              text-white
              shadow-xl
              transition
              hover:bg-[#7A002F]
              "
            >
              {loading ? "Uploading..." : "Upload Collection →"}
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}