import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] text-stone-900">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-8 pt-24 pb-24">

        <div className="max-w-5xl">

          <div className="inline-flex rounded-full bg-white px-5 py-3 shadow-md text-sm font-medium text-[#8B5E34]">
            Digital Sanskrit Heritage Collection
          </div>

          <h1 className="mt-8 text-6xl font-bold leading-tight lg:text-8xl">
            Seth Shree Surajmal
            <br />
            Tapariya E-Granthalay
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-stone-500">
            Preserving Sanskrit heritage through rare manuscripts,
            historical books, digitized archives and timeless knowledge
            for future generations.
          </p>

          {/* SEARCH */}
          <div className="mt-14 max-w-3xl">

            <div className="rounded-full bg-white px-8 py-6 shadow-xl">

              <input
                type="text"
                placeholder="Search manuscripts, books and collections..."
                className="
                  w-full
                  bg-transparent
                  text-lg
                  outline-none
                  placeholder:text-stone-400
                "
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap gap-5">

            <Link href="/manuscripts">
              <button
                className="
                  rounded-full
                  bg-[#8B5E34]
                  px-8
                  py-5
                  text-white
                  shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >
                Explore Manuscripts
              </button>
            </Link>

            <Link href="/books">
              <button
                className="
                  rounded-full
                  bg-white
                  px-8
                  py-5
                  text-[#8B5E34]
                  shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >
                Browse Books
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-8 pb-28">

        <div className="grid gap-8 md:grid-cols-4">

          <div className="rounded-[32px] bg-white p-10 shadow-xl">

            <h2 className="text-5xl font-bold text-[#8B5E34]">
              13K+
            </h2>

            <p className="mt-4 text-stone-500">
              Manuscripts
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-10 shadow-xl">

            <h2 className="text-5xl font-bold text-[#8B5E34]">
              5K+
            </h2>

            <p className="mt-4 text-stone-500">
              Books
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-10 shadow-xl">

            <h2 className="text-5xl font-bold text-[#8B5E34]">
              1.2M+
            </h2>

            <p className="mt-4 text-stone-500">
              Pages Archived
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-10 shadow-xl">

            <h2 className="text-5xl font-bold text-[#8B5E34]">
              25+
            </h2>

            <p className="mt-4 text-stone-500">
              Collections
            </p>

          </div>

        </div>

      </section>
            {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-8 pb-32">

        <div className="mb-16">

          <div className="text-sm font-medium text-[#8B5E34]">
            Discover
          </div>

          <h2 className="mt-4 text-5xl font-bold">
            Explore Collections
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-500">
            Discover rare manuscripts and historical literary archives
            preserved for future generations.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* MANUSCRIPTS */}
          <Link href="/manuscripts">

            <div
              className="
                group
                overflow-hidden
                rounded-[40px]
                bg-white
                shadow-2xl
                transition
                duration-300
                hover:-translate-y-2
              "
            >

              <div className="overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200"
                  alt="Manuscripts"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-10">

                <div className="inline-flex rounded-full bg-[#F8F5EF] px-4 py-2 text-sm text-[#8B5E34]">
                  Historical Archives
                </div>

                <h3 className="mt-6 text-4xl font-bold">
                  Sanskrit Manuscripts
                </h3>

                <p className="mt-6 text-lg leading-8 text-stone-500">
                  Explore thousands of digitized manuscripts,
                  preserved texts and ancient Sanskrit collections.
                </p>

                <div className="mt-8 text-[#8B5E34] font-semibold">
                  Explore →
                </div>

              </div>

            </div>

          </Link>

          {/* BOOKS */}
          <Link href="/books">

            <div
              className="
                group
                overflow-hidden
                rounded-[40px]
                bg-white
                shadow-2xl
                transition
                duration-300
                hover:-translate-y-2
              "
            >

              <div className="overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
                  alt="Books"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

              </div>

              <div className="p-10">

                <div className="inline-flex rounded-full bg-[#F8F5EF] px-4 py-2 text-sm text-[#8B5E34]">
                  Literary Heritage
                </div>

                <h3 className="mt-6 text-4xl font-bold">
                  Rare Books Collection
                </h3>

                <p className="mt-6 text-lg leading-8 text-stone-500">
                  Browse philosophy, literature and historical
                  archives preserved digitally.
                </p>

                <div className="mt-8 text-[#8B5E34] font-semibold">
                  Browse →
                </div>

              </div>

            </div>

          </Link>

        </div>

      </section>
            {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-8 pb-32">

        <div className="mb-20">

          <div className="text-sm font-medium text-[#8B5E34]">
            Highlights
          </div>

          <h2 className="mt-4 text-5xl font-bold">
            Featured Collections
          </h2>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="rounded-[32px] bg-white p-8 shadow-xl">

            <div className="text-sm text-[#8B5E34]">
              Featured
            </div>

            <h3 className="mt-5 text-3xl font-bold">
              Sanskrit Manuscripts
            </h3>

            <p className="mt-5 leading-8 text-stone-500">
              Thousands of preserved manuscripts and rare collections.
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-xl">

            <div className="text-sm text-[#8B5E34]">
              Rare Books
            </div>

            <h3 className="mt-5 text-3xl font-bold">
              Literary Heritage
            </h3>

            <p className="mt-5 leading-8 text-stone-500">
              Philosophy, literature and historical archives.
            </p>

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-xl">

            <div className="text-sm text-[#8B5E34]">
              Digital Archive
            </div>

            <h3 className="mt-5 text-3xl font-bold">
              Historical Collections
            </h3>

            <p className="mt-5 leading-8 text-stone-500">
              Preserved pages and ancient knowledge for future generations.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-8 pb-32">

        <div className="overflow-hidden rounded-[48px] bg-[#8B5E34] px-12 py-24 text-center text-white shadow-2xl">

          <div className="mx-auto max-w-4xl">

            <h2 className="text-5xl font-bold leading-tight">

              Begin Your Journey Into
              <br />
              Sanskrit Knowledge

            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-stone-200">

              Access rare manuscripts, preserved texts and
              historical books from anywhere in the world.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <Link href="/manuscripts">

                <button className="rounded-full bg-white px-8 py-5 font-semibold text-[#8B5E34] shadow-xl">

                  Explore Manuscripts

                </button>

              </Link>

              <Link href="/books">

                <button className="rounded-full border border-white px-8 py-5 font-semibold">

                  Browse Books

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-16">

        <div className="mx-auto max-w-7xl px-8">

          <h3 className="text-3xl font-bold">
            Seth Shree Surajmal Tapariya E-Granthalay
          </h3>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-500">

            A Digital Repository of Sanskrit Manuscripts,
            Rare Books and Historical Collections.

          </p>

          <div className="mt-10 text-sm text-stone-400">

            © 2026 SMTASM • Preserving Knowledge For Future Generations

          </div>

        </div>

      </footer>

    </main>
  );
}