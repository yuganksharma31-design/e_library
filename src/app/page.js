import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* HERO */}
      <section className="border-b border-zinc-800">

        <div className="mx-auto max-w-7xl px-6 py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
              Digital Archive Platform
            </div>

            <h1 className="text-6xl font-bold leading-tight lg:text-7xl">
              SMT Library
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-400">
              Explore rare manuscripts, historical books,
ancient Sanskrit texts, and preserved digital archives.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link href="/manuscripts">
                <button className="rounded-2xl bg-amber-500 px-8 py-5 text-lg font-semibold text-black transition hover:scale-105">
                  Explore Manuscripts
                </button>
              </Link>

              <Link href="/books">
                <button className="rounded-2xl border border-zinc-700 px-8 py-5 text-lg font-semibold hover:bg-zinc-900">
                  Browse Books
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-zinc-900 bg-zinc-950 py-16">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-4xl font-bold text-amber-500">
              13K+
            </h2>

            <p className="mt-2 text-zinc-400">
              Manuscripts
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-4xl font-bold text-amber-500">
              5K+
            </h2>

            <p className="mt-2 text-zinc-400">
              Books
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-4xl font-bold text-amber-500">
              1.2M+
            </h2>

            <p className="mt-2 text-zinc-400">
              Pages Archived
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-4xl font-bold text-amber-500">
              25+
            </h2>

            <p className="mt-2 text-zinc-400">
              Collections
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="mb-16">
          <h2 className="text-5xl font-bold">
            Explore Collections
          </h2>

          <p className="mt-4 text-lg text-zinc-400">
            Browse curated digital archives and historical collections.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* MANUSCRIPTS CARD */}
          <Link href="/manuscripts">

            <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-amber-500/40">

              <div className="relative h-[400px] overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop"
                  alt="Manuscripts"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">

                  <div className="mb-4 inline-flex rounded-full bg-amber-500/20 px-4 py-2 text-sm text-amber-400">
                    Historical Archives
                  </div>

                  <h3 className="text-4xl font-bold">
                    Sanskrit Manuscripts
                  </h3>

                  <p className="mt-4 text-lg text-zinc-300">
                    Explore thousands of digitized ancient manuscripts and preserved texts.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* BOOKS CARD */}
          <Link href="/books">

            <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-amber-500/40">

              <div className="relative h-[400px] overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop"
                  alt="Books"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">

                  <div className="mb-4 inline-flex rounded-full bg-amber-500/20 px-4 py-2 text-sm text-amber-400">
                    SMT Library
                  </div>

                  <h3 className="text-4xl font-bold">
                    Rare Books Collection
                  </h3>

                  <p className="mt-4 text-lg text-zinc-300">
                    Browse ancient books, philosophy texts, and preserved literary archives.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 py-24">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-5xl font-bold">
            Preserving Knowledge For Future Generations
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-zinc-400">
            Access historical archives, rare manuscripts,
            and digital collections from anywhere in the world.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link href="/manuscripts">
              <button className="rounded-2xl bg-amber-500 px-8 py-5 text-lg font-semibold text-black hover:scale-105">
                Start Exploring
              </button>
            </Link>

            <Link href="/books">
              <button className="rounded-2xl border border-zinc-700 px-8 py-5 text-lg font-semibold hover:bg-zinc-900">
                View Books
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}