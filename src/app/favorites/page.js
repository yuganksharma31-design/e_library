"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(data);

  }, []);

  return (

    <main className="min-h-screen bg-[#F8F5EF] px-8 py-20">

      <h1 className="mb-12 text-5xl font-bold">
        ❤️ Favorite Books
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

        {favorites.map((item) => (

          <Link
            key={item.id}
            href={`/book/${item.id}`}
          >

            <div className="overflow-hidden rounded-[24px] bg-white shadow-xl">

              <img
                src={item.cover}
                className="h-[240px] w-full object-cover"
              />

              <div className="p-5">

                <h2 className="line-clamp-2 font-bold">

                  {item.title}

                </h2>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </main>

  );
}