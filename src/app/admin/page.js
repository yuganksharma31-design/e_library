"use client";

import { useState } from "react";

export default function AdminPage() {

  const [form, setForm] =
    useState({

      title: "",

      creator: "",

      identifier: "",

      type: "book",

      coverImage: "",
    });

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    try {

      const res =
        await fetch(
          "/api/admin/upload",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(form),
          }
        );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "Uploaded Successfully"
        );

        setForm({

          title: "",

          creator: "",

          identifier: "",

          type: "book",

          coverImage: "",
        });

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
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Creator"
            required
            value={form.creator}
            onChange={(e) =>
              setForm({
                ...form,
                creator:
                  e.target.value,
              })
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Archive.org Identifier"
            required
            value={form.identifier}
            onChange={(e) =>
              setForm({
                ...form,
                identifier:
                  e.target.value,
              })
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Cover Image URL"
            value={form.coverImage}
            onChange={(e) =>
              setForm({
                ...form,
                coverImage:
                  e.target.value,
              })
            }
            className="w-full p-4 border rounded-xl"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type:
                  e.target.value,
              })
            }
            className="w-full p-4 border rounded-xl"
          >

            <option value="book">

              Book

            </option>

            <option value="manuscript">

              Manuscript

            </option>

          </select>

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