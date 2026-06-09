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
<section className="mx-auto max-w-7xl px-8 py-32">

  <div className="mb-20">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
      Collections
    </div>

    <h2 className="mt-5 text-6xl font-bold text-[#1C1C1C]">

      Explore Our Archives

    </h2>

  </div>

  <div className="grid gap-10 lg:grid-cols-2">

    {/* MANUSCRIPTS */}
    <Link href="/manuscripts">

      <div className="group relative overflow-hidden rounded-[40px]">

        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200"
          className="
            h-[500px]
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute bottom-10 left-10 right-10 text-white">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">

            Historical Archives

          </div>

          <h3 className="mt-5 text-5xl font-bold">

            Sanskrit
            <br />
            Manuscripts

          </h3>

          <p className="mt-6 max-w-md text-lg leading-8 text-stone-200">

            Explore thousands of digitized manuscripts
            and ancient Sanskrit collections.

          </p>

          <div className="mt-8 font-semibold text-yellow-300">

            Explore →

          </div>

        </div>

      </div>

    </Link>

    {/* BOOKS */}
    <Link href="/books">

      <div className="group relative overflow-hidden rounded-[40px]">

        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
          className="
            h-[500px]
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute bottom-10 left-10 right-10 text-white">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">

            Literary Heritage

          </div>

          <h3 className="mt-5 text-5xl font-bold">

            Rare Books
            <br />
            Collection

          </h3>

          <p className="mt-6 max-w-md text-lg leading-8 text-stone-200">

            Browse philosophy, literature and
            historical archives preserved digitally.

          </p>

          <div className="mt-8 font-semibold text-yellow-300">

            Browse →

          </div>

        </div>

      </div>

    </Link>

  </div>

</section>

           {/* ABOUT */}
<section
  className="
    relative
    overflow-hidden
    bg-[#98003A]
    py-28
    text-center
    text-white
  "
>

  <div className="mx-auto max-w-5xl px-8">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
      About Us
    </div>

    <h2 className="mt-8 text-6xl font-bold">
      Preserving Wisdom
      <br />
      Across Generations
    </h2>

    <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-stone-200">

      Seth Shree Surajmal Tapariya E-Granthalay is committed to
      preserving rare manuscripts, historical books and invaluable
      Sanskrit heritage. Through digitization and global accessibility,
      we ensure timeless knowledge remains available for future scholars.

    </p>

    <button
      className="
        mt-14
        rounded-full
        bg-yellow-400
        px-8
        py-4
        font-semibold
        text-black
        transition
        hover:scale-105
      "
    >
      Read More
    </button>

  </div>

</section>
   
{/* MISSION */}
<section
  className="
    relative
    overflow-hidden
    bg-[#98003A]
    py-32
    text-white
  "
>

  {/* Pattern */}
  <div
    className="
      absolute
      inset-0
      opacity-10
    "
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
      backgroundSize: "30px 30px"
    }}
  />

  <div className="relative mx-auto max-w-7xl px-8">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">

      Our Mission

    </div>

    <div className="mt-10 grid gap-20 lg:grid-cols-2">

      {/* LEFT */}
      <div>

        <h2 className="text-6xl font-bold leading-tight">

          Preserving
          <br />

          Knowledge For
          <br />

          Future
          <br />

          Generations

        </h2>

      </div>

      {/* RIGHT */}
      <div>

        <p className="text-xl leading-10 text-stone-200">

          We are dedicated to safeguarding Sanskrit manuscripts,
          rare books and historical archives through digitization
          and worldwide accessibility. Our mission is to preserve
          the intellectual heritage of generations past and make
          it available to scholars and seekers everywhere.

        </p>

        <button
          className="
            mt-12
            rounded-full
            bg-yellow-400
            px-8
            py-5
            font-semibold
            text-black
            transition
            hover:scale-105
          "
        >

          Explore Collections

        </button>

      </div>

    </div>

  </div>

</section>


     
{/* FOOTER */}
<footer className="border-t border-stone-200 bg-white">

  <div className="mx-auto grid max-w-7xl gap-16 px-8 py-20 md:grid-cols-4">

    {/* BRAND */}
    <div>

      <h3 className="text-3xl font-bold text-[#98003A]">

        Seth Shree Surajmal
        <br />
        Tapariya
        <br />
        E-Granthalay

      </h3>

      <p className="mt-6 leading-8 text-stone-500">

        Preserving Sanskrit manuscripts, rare books and
        historical collections for future generations.

      </p>

    </div>

    {/* COLLECTIONS */}
    <div>

      <h4 className="text-lg font-bold text-[#98003A]">
        Collections
      </h4>

      <div className="mt-6 space-y-4 text-stone-500">

        <Link href="/manuscripts">
          <div className="hover:text-[#98003A]">
            Manuscripts
          </div>
        </Link>

        <Link href="/books">
          <div className="hover:text-[#98003A]">
            Books
          </div>
        </Link>

      </div>

    </div>

    {/* EXPLORE */}
    <div>

      <h4 className="text-lg font-bold text-[#98003A]">
        Explore
      </h4>

      <div className="mt-6 space-y-4 text-stone-500">

        <div>About Us</div>

        <div>Digital Archives</div>

        <div>Collections</div>

      </div>

    </div>

    {/* RESOURCES */}
    <div>

      <h4 className="text-lg font-bold text-[#98003A]">
        Resources
      </h4>

      <div className="mt-6 space-y-4 text-stone-500">

        <div>Privacy Policy</div>

        <div>Terms & Conditions</div>

        <div>Contact</div>

      </div>

    </div>

  </div>

  <div className="border-t border-stone-200 py-8 text-center text-sm text-stone-400">

    © 2026 SMTASM • Preserving Knowledge For Future Generations

  </div>

</footer>

    </main>
  );
}