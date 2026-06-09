import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] text-stone-900">

      {/* HERO */}
      <section className="bg-[#F7F5F2]">

        <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
              About Us
            </div>

            <h1 className="mt-6 text-6xl font-bold leading-tight">

              Preserving
              <br />

              Knowledge &
              Heritage

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-stone-600">

              Seth Shree Surajmal Tapariya E-Granthalay is a
              digital repository dedicated to preserving
              Sanskrit manuscripts, rare books and historical
              collections for future generations.

            </p>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200"
              className="
                h-[500px]
                w-full
                rounded-[40px]
                object-cover
                shadow-2xl
              "
            />

          </div>

        </div>

      </section>
      {/* OUR STORY */}
<section className="mx-auto max-w-7xl px-8 py-24">

  <div className="rounded-[50px] bg-white p-16 shadow-2xl">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
      Our Story
    </div>

    <h2 className="mt-6 text-5xl font-bold">
      Preserving Heritage Through Technology
    </h2>

    <p className="mt-8 max-w-4xl text-lg leading-9 text-stone-600">

      Seth Shree Surajmal Tapariya E-Granthalay was established
      with the vision of preserving rare Sanskrit manuscripts,
      historical books and literary treasures through digital
      archiving.

      Our mission is to make these valuable collections accessible
      to scholars, researchers and future generations while ensuring
      their preservation for centuries to come.

    </p>

  </div>

</section>



{/* STATISTICS */}
<section className="mx-auto max-w-7xl px-8 pb-24">

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-[36px] bg-white p-10 shadow-xl">

      <div className="text-5xl font-bold text-[#98003A]">
        13K+
      </div>

      <div className="mt-4 text-stone-500">
        Manuscripts
      </div>

    </div>

    <div className="rounded-[36px] bg-white p-10 shadow-xl">

      <div className="text-5xl font-bold text-[#98003A]">
        5K+
      </div>

      <div className="mt-4 text-stone-500">
        Books
      </div>

    </div>

    <div className="rounded-[36px] bg-white p-10 shadow-xl">

      <div className="text-5xl font-bold text-[#98003A]">
        1.2M+
      </div>

      <div className="mt-4 text-stone-500">
        Pages Archived
      </div>

    </div>

    <div className="rounded-[36px] bg-white p-10 shadow-xl">

      <div className="text-5xl font-bold text-[#98003A]">
        25+
      </div>

      <div className="mt-4 text-stone-500">
        Collections
      </div>

    </div>

  </div>

</section>
{/* MISSION & VISION */}
<section className="bg-[#98003A]">

  <div className="mx-auto max-w-7xl px-8 py-28">

    <div className="mb-16 text-center">

      <div className="text-sm font-semibold uppercase tracking-[4px] text-white/70">
        Mission & Vision
      </div>

      <h2 className="mt-6 text-5xl font-bold text-white">
        Our Purpose
      </h2>

    </div>

    <div className="grid gap-10 lg:grid-cols-2">

      {/* MISSION */}
      <div className="rounded-[40px] bg-white p-14 shadow-2xl">

        <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
          Mission
        </div>

        <h3 className="mt-6 text-4xl font-bold text-stone-900">
          Preserve Ancient Knowledge
        </h3>

        <p className="mt-8 text-lg leading-9 text-stone-600">

          To digitally preserve Sanskrit manuscripts,
          rare books and historical collections while
          providing researchers and scholars worldwide
          with easy access to our literary heritage.

        </p>

      </div>

      {/* VISION */}
      <div className="rounded-[40px] bg-white p-14 shadow-2xl">

        <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
          Vision
        </div>

        <h3 className="mt-6 text-4xl font-bold text-stone-900">
          A Global Digital Heritage Library
        </h3>

        <p className="mt-8 text-lg leading-9 text-stone-600">

          To become a world-class digital repository
          safeguarding valuable literary treasures and
          making India's rich knowledge tradition
          accessible for future generations.

        </p>

      </div>

    </div>

  </div>

</section>
{/* FOOTER */}
<footer className="bg-[#F8F5EF]">

  <div className="mx-auto max-w-7xl px-8 py-24">

    <div className="grid gap-16 lg:grid-cols-2">

      <div>

        <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
          Digital Heritage Library
        </div>

        <h2 className="mt-6 text-5xl font-bold text-stone-900">

          Seth Shree Surajmal
          <br />
          Tapariya E-Granthalay

        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-9 text-stone-500">

          A digital repository dedicated to preserving
          Sanskrit manuscripts, rare books and historical
          collections for scholars, researchers and future
          generations.

        </p>

      </div>

      <div className="flex flex-col justify-end">

        <div className="rounded-[40px] bg-white p-12 shadow-2xl">

          <h3 className="text-3xl font-bold text-[#98003A]">

            Preserving Knowledge Through Technology

          </h3>

          <p className="mt-6 text-lg leading-9 text-stone-600">

            Our vision is to make ancient literary heritage
            accessible globally while safeguarding invaluable
            manuscripts and books for centuries to come.

          </p>

        </div>

      </div>

    </div>

    <div className="mt-24 border-t border-stone-200 pt-10 text-sm text-stone-400">

      © 2026 SMTASM • All Rights Reserved

    </div>

  </div>

</footer>
</main>

  );
}