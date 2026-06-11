"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(data);

  }, []);

  function removeFavorite(id) {

    const updated = favorites.filter(
      (item) => item.id !== id
    );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

  }

  return (

    <main className="min-h-screen bg-[#F8F5EF] px-8 py-20">

      <div className="mx-auto max-w-7xl">

        <div className="mb-16">

          <div className="text-sm uppercase tracking-[4px] text-[#98003A]">
            Personal Library
          </div>

          <h1 className="mt-4 text-6xl font-bold text-black">
            ❤️ Favorites
          </h1>

          <p className="mt-4 text-stone-500">
            {favorites.length} saved books and manuscripts
          </p>

        </div>

        {favorites.length === 0 ? (

          <div className="rounded-[40px] bg-white p-20 text-center shadow-xl">

            <h2 className="text-3xl font-bold text-black">
              No favorites yet
            </h2>

            <p className="mt-5 text-stone-500">
              Add books and manuscripts to your favorites.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

            {favorites.map((item) => (

              <div
                key={item.id}
                className="overflow-hidden rounded-[30px] bg-white shadow-xl"
              >

                <Link href={`/reader/${item.id}`}>

                  <img
                    src={item.cover}
                    className="h-[260px] w-full object-cover"
                  />

                </Link>

                <div className="p-5">

                  <h2 className="line-clamp-2 text-lg font-bold text-black">
                    {item.title}
                  </h2>

                  <button
                    onClick={() =>
                      removeFavorite(item.id)
                    }
                    className="
                    mt-6
                    w-full
                    rounded-xl
                    bg-[#98003A]
                    py-3
                    text-white
                    "
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>

  );

}