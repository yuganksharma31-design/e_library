import Link from "next/link";

export default function CataloguesPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#1C1C1C]">

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-8 py-24">

        <div className="text-center">

          <div className="text-sm uppercase tracking-[5px] text-[#98003A]">
            Digital Catalogue
          </div>

          <h1 className="mt-6 text-6xl font-bold">
            Library Catalogues
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-stone-600">
            Explore the complete catalogues of books and manuscripts
            preserved by Seth Shri Surajmal Taparia E-Granthalay.
          </p>

        </div>

      </section>

      {/* CARDS */}
      <section className="mx-auto max-w-7xl px-8 pb-24">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* BOOKS */}
          <div
            className="
            rounded-[40px]
            bg-white
            border border-[#E8D9B5]
            shadow-2xl
            p-14
            "
          >

            <div className="text-6xl">
              📚
            </div>

            <div className="mt-10 text-sm uppercase tracking-[4px] text-[#98003A]">
              Books Collection
            </div>

            <h2 className="mt-5 text-5xl font-bold">
              Books Catalogue
            </h2>

            <p className="mt-8 text-lg leading-9 text-stone-600">
              Browse more than 30,000 books covering Sanskrit,
              philosophy, literature and historical texts.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <a
                href="/Books_Catalogue.pdf"
                target="_blank"
                className="
                rounded-full
                bg-[#98003A]
                px-8 py-4
                text-white
                font-semibold
                shadow-lg
                transition
                hover:bg-[#7A002F]
                "
              >
                View Catalogue
              </a>

              <a
                href="/Books_Catalogue.pdf"
                download
                className="
                rounded-full
                bg-yellow-400
                px-8 py-4
                font-semibold
                shadow-lg
                transition
                hover:scale-105
                "
              >
                Download PDF
              </a>

            </div>

          </div>

          {/* MANUSCRIPTS */}
          <div
            className="
            rounded-[40px]
            bg-white
            border border-[#E8D9B5]
            shadow-2xl
            p-14
            "
          >

            <div className="text-6xl">
              📜
            </div>

            <div className="mt-10 text-sm uppercase tracking-[4px] text-[#98003A]">
              Heritage Collection
            </div>

            <h2 className="mt-5 text-5xl font-bold">
              Manuscripts Catalogue
            </h2>

            <p className="mt-8 text-lg leading-9 text-stone-600">
              Explore over 112,000 manuscripts preserved for
              scholars and future generations.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <a
                href="/manuscript_Catalogue.pdf"
                target="_blank"
                className="
                rounded-full
                bg-[#98003A]
                px-8 py-4
                text-white
                font-semibold
                shadow-lg
                transition
                hover:bg-[#7A002F]
                "
              >
                View Catalogue
              </a>

              <a
                href="/catalogues/Manuscripts_Catalogue.pdf"
                download
                className="
                rounded-full
                bg-yellow-400
                px-8 py-4
                font-semibold
                shadow-lg
                transition
                hover:scale-105
                "
              >
                Download PDF
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-8 pb-28">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-[32px] bg-white shadow-xl p-10">
            <h2 className="text-5xl font-bold text-[#98003A]">
              112K+
            </h2>

            <p className="mt-4 text-stone-500">
              Manuscripts
            </p>
          </div>

          <div className="rounded-[32px] bg-white shadow-xl p-10">
            <h2 className="text-5xl font-bold text-[#98003A]">
              30K+
            </h2>

            <p className="mt-4 text-stone-500">
              Books
            </p>
          </div>

          <div className="rounded-[32px] bg-white shadow-xl p-10">
            <h2 className="text-5xl font-bold text-[#98003A]">
              2
            </h2>

            <p className="mt-4 text-stone-500">
              Catalogues
            </p>
          </div>

          <div className="rounded-[32px] bg-white shadow-xl p-10">
            <h2 className="text-5xl font-bold text-[#98003A]">
              PDF
            </h2>

            <p className="mt-4 text-stone-500">
              Downloads
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}