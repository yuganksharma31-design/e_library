"use client";

import { useState } from "react";

export default function AdminPage() {

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    const formData =
      new FormData(e.target);

    try {

      const res =
        await fetch(
          "/api/admin/upload",
          {
            method: "POST",

            body: formData,
          }
        );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "Uploaded Successfully"
        );

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

    <main className="min-h-screen bg-[#f5f5f5] p-10">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8">

          Admin Upload Panel

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="creator"
            placeholder="Creator"
            required
            className="w-full p-4 border rounded-xl"
          />

          <select
            name="type"
            className="w-full p-4 border rounded-xl"
          >

            <option value="book">

              Book

            </option>

            <option value="manuscript">

              Manuscript

            </option>

          </select>

          <div>

            <label className="font-semibold">

              Cover Image

            </label>

            <input
              type="file"
              name="cover"
              accept="image/*"
              required
              className="w-full mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">

              PDF Upload

            </label>

            <input
              type="file"
              name="pdf"
              accept=".pdf"
              required
              className="w-full mt-2"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold"
          >

            {loading
              ? "Uploading..."
              : "Upload"}

          </button>

        </form>

      </div>

    </main>
  );
}