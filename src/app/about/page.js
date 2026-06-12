import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#98003A] text-white">

      {/* HERO */}
      <section className="bg-[#98003A]">

        <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
              About Us
            </div>

            <h1 className="mt-6 text-7xl font-bold leading-tight text-white">

              Preserving
              <br />

              Knowledge &
              Heritage

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-stone-200">

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

  <div className="
rounded-[50px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-16
">

    <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
      Our Story
    </div>

    <h2 className="mt-6 text-5xl font-bold">
      Preserving Heritage Through Technology
    </h2>

    <p className="mt-8 max-w-4xl text-lg leading-9 text-stone-200">

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

    <div className="rounded-[36px] bg-[#B31255]
border border-pink-400/20
shadow-2xl
p-10">

      <div className="text-5xl font-bold text-yellow-300">
        13K+
      </div>

      <div className="mt-4 text-stone-200">
        Manuscripts
      </div>

    </div>

    <div className="rounded-[36px] bg-[#B31255]
border border-pink-400/20
shadow-2xl
p-10">

      <div className="text-5xl font-bold text-yellow-300">
        5K+
      </div>

      <div className="mt-4 text-stone-200">
        Books
      </div>

    </div>

    <div className="rounded-[36px] bg-[#B31255]
border border-pink-400/20
shadow-2xl
p-10">

      <div className="text-5xl font-bold text-yellow-300">
        1.2M+
      </div>

      <div className="mt-4 text-stone-200">
        Pages Archived
      </div>

    </div>

    <div className="rounded-[36px] bg-[#B31255]
border border-pink-400/20
shadow-2xl
p-10">

      <div className="text-5xl font-bold text-yellow-300">
        25+
      </div>

      <div className="mt-4 text-stone-200">
        Collections
      </div>

    </div>

  </div>

</section>
{/* MISSION & VISION */}
<section className="bg-[#98003A]">

  <div className="mx-auto max-w-7xl px-8 py-28">

    <div className="mb-16 text-center">

      <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
        Mission & Vision
      </div>

      <h2 className="mt-6 text-5xl font-bold text-white">
        Our Purpose
      </h2>

    </div>

    <div className="grid gap-10 lg:grid-cols-2">

      {/* MISSION */}
      <div className="rounded-[40px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-14">

        <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
          Mission
        </div>

        <h3 className="mt-6 text-4xl font-bold text-white">
          Preserve Ancient Knowledge
        </h3>

        <p className="mt-8 text-lg leading-9 text-stone-200">

          To digitally preserve Sanskrit manuscripts,
          rare books and historical collections while
          providing researchers and scholars worldwide
          with easy access to our literary heritage.

        </p>

      </div>

      {/* VISION */}
      <div className="rounded-[40px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-14">

        <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
          Vision
        </div>

        <h3 className="mt-6 text-4xl font-bold text-white">
          A Global Digital Heritage Library
        </h3>

        <p className="mt-8 text-lg leading-9 text-stone-200">

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
<footer className="bg-[#7A002F]">

  <div className="mx-auto max-w-7xl px-8 py-24">

    <div className="grid gap-16 lg:grid-cols-2">

      <div>

        <div className="text-sm font-semibold uppercase tracking-[4px] text-yellow-300">
          Digital Heritage Library
        </div>

        <h2 className="mt-6 text-5xl font-bold text-white">

          Seth Shree Surajmal
          <br />
          Tapariya E-Granthalay

        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-9 text-stone-200">

          A digital repository dedicated to preserving
          Sanskrit manuscripts, rare books and historical
          collections for scholars, researchers and future
          generations.

        </p>

      </div>

      <div className="flex flex-col justify-end">

        <div className="
rounded-[40px]
bg-white/10
border border-white/10
backdrop-blur-xl
p-12
">

          <h3 className="text-3xl font-bold text-yellow-300">

            Preserving Knowledge Through Technology

          </h3>

          <p className="mt-6 text-lg leading-9 text-stone-200">

            Our vision is to make ancient literary heritage
            accessible globally while safeguarding invaluable
            manuscripts and books for centuries to come.

          </p>

        </div>

      </div>

    </div>

    <div className="mt-24 border-t border-white/10 pt-10 text-sm text-stone-300">

      © 2026 SMTASM • All Rights Reserved

    </div>

  </div>

</footer>
</main>

  );
}