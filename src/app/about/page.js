
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F5EF] text-[#1C1C1C]">

      {/* HERO */}
        
  
      <section className="bg-[#F7F5F2]">

        <div className="mx-auto grid max-w-7xl gap-16 px-8 py-24 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
             
            </div>

            <h1 className="mt-6 text-6xl font-bold leading-tight lg:text-7xl">

              Preserving
              <br />

              India's Literary
              Heritage

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-stone-600">

              Seth Shri Surajmal Taparia E-Sangrhalay is a
              dedicated digital library, manuscript repository
              and research centre preserving India's timeless
              literary treasures for future generations.

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

      {/* ABOUT */}
      {/* BOARD OF TRUSTEES */}
<section className="mx-auto max-w-7xl px-8 py-24">

  <div className="mb-16">
    <div className="text-sm uppercase tracking-[4px] text-[#98003A]">
      Leadership
    </div>

    <h2 className="mt-4 text-5xl font-bold">
      Board of Trustees & Principal
    </h2>
  </div>

  <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

    {[
      {
        image: "/trustees/trustee1.jpg",
        name: "Shri Bajranglal Taparia",
        role: "Trustee"
      },
      {
        image: "/trustees/trustee2.jpg",
        name: "Shri M. P. Taparia",
        role: "Trustee"
      },
      {
        image: "/trustees/trustee3.jpg",
        name: "Shri S. J. Taparia",
        role: "Trustee"
      },
      {
        image: "/trustees/trustee4.jpg",
        name: "Shri V. K. Taparia",
        role: "Trustee"
      },
      {
        image: "/trustees/principal.jpg",
        name: "Dr. Hemant Krishan Mishra",
        role: "Principal"
      }
    ].map((person) => (

      <div key={person.name}>

        <div className="overflow-hidden rounded-[24px] bg-[#EEF2F3]">

          <img
            src={person.image}
            alt={person.name}
            className="
  h-[360px]
  w-full
  object-cover
  object-top
"
          />

        </div>

        <h3 className="mt-6 text-2xl font-semibold text-[#1C1C1C]">
          {person.name}
        </h3>

        <p className="mt-2 text-lg text-stone-500">
          {person.role}
        </p>

      </div>

    ))}

  </div>

</section>
      
      <section className="mx-auto max-w-7xl px-8 py-24">

        <div className="rounded-[50px] bg-white border border-[#E8D9B5] p-16 shadow-2xl">

          <div className="text-sm font-semibold uppercase tracking-[4px] text-[#98003A]">
            About Us
          </div>

          <h2 className="mt-6 text-5xl font-bold">
            Seth Shri Surajmal Taparia E-Sangrhalay
          </h2>

          <p className="mt-8 text-lg leading-9 text-stone-600">

            Welcome to Seth Shri Surajmal Taparia E-Sangrhalay,
            a dedicated digital library, manuscript repository
            and research centre supported by the philanthropic
            vision of the Taparia family and operated by
            Seth Shri Surajmal Taparia Acharya Sanskrit
            Mahavidyalaya, Jaswantgarh, Didwana-Nagaur, Rajasthan.

          </p>

          <p className="mt-8 text-lg leading-9 text-stone-600">

            Our digital library is an Official Partner Centre
            of Gyan Bharatam Mission under the Ministry of
            Culture, Government of India. We specialize in
            surveying, cataloguing, archiving and digitizing
            rare manuscripts, with a special focus on preserving
            knowledge repositories across the Shekhawati region.

          </p>

        </div>

      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-8 pb-24">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {[
            ["13K+", "Manuscripts"],
            ["15K+", "Books"],
            ["25+", "Collections"],
            ["Official", "Partner Centre"],
          ].map((item) => (

            <div
              key={item[1]}
              className="
              rounded-[36px]
              bg-white
              border border-[#E8D9B5]
              shadow-xl
              p-10
              "
            >

              <div className="h-2 rounded-full bg-gradient-to-r from-[#98003A] to-[#D6A700]" />

              <div className="mt-6 text-5xl font-bold text-[#98003A]">
                {item[0]}
              </div>

              <div className="mt-4 text-stone-500">
                {item[1]}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* MISSION */}
      <section className="bg-[#98003A]">

        <div className="mx-auto max-w-7xl px-8 py-28">

          <div className="mb-16 text-center">

            <div className="text-sm uppercase tracking-[4px] text-yellow-300">
              Mission & Vision
            </div>

            <h2 className="mt-6 text-5xl font-bold text-white">
              Our Purpose
            </h2>

          </div>

          <div className="grid gap-10 lg:grid-cols-2">

            <div className="rounded-[40px] bg-white p-14 shadow-2xl">

              <div className="text-sm uppercase tracking-[4px] text-[#98003A]">
                Mission
              </div>

              <h3 className="mt-6 text-4xl font-bold">
                Preserve Ancient Knowledge
              </h3>

              <p className="mt-8 text-lg leading-9 text-stone-600">

                To preserve and promote India's literary heritage
                through digitization, documentation, research and
                collaboration while making rare knowledge accessible
                to scholars worldwide.

              </p>

            </div>

            <div className="rounded-[40px] bg-white p-14 shadow-2xl">

              <div className="text-sm uppercase tracking-[4px] text-[#98003A]">
                Vision
              </div>

              <h3 className="mt-6 text-4xl font-bold">
                A Global Digital Heritage Library
              </h3>

              <p className="mt-8 text-lg leading-9 text-stone-600">

                To become a leading digital guardian of India's
                intellectual and cultural heritage and empower
                researchers, scholars and students worldwide.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* RECOGNITION */}
      <section className="mx-auto max-w-7xl px-8 py-24">

        <div className="rounded-[50px] bg-[#98003A] p-20 text-center shadow-2xl">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">
            Official Recognition
          </div>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Gyan Bharatam Mission
          </h2>

          <p className="mt-8 text-lg leading-9 text-stone-200">

            Official Partner Centre under the Ministry of Culture,
            Government of India, dedicated to manuscript preservation,
            digitization and cultural heritage conservation.

          </p>

        </div>

      </section>

        {/* QUOTE */}
      <section className="bg-[#7A002F] py-28 text-center">

        <div className="mx-auto max-w-5xl px-8">

          <div className="text-sm uppercase tracking-[4px] text-yellow-300">
            Heritage
          </div>

          <h2 className="mt-8 text-6xl font-bold text-white">

            Preserving Knowledge
            <br />
            Through Generations

          </h2>

          <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-stone-200">

            By safeguarding manuscripts and literary treasures today,
            we ensure that the wisdom of our ancestors continues to
            inspire the world tomorrow.

          </p>

          <Link
            href="/book"
            className="
            mt-12 inline-flex rounded-full
            bg-yellow-400 px-10 py-5
            font-semibold text-black
            transition hover:bg-white
            "
          >
            Browse Collection →
          </Link>

        </div>

      </section>

    </main>
  );
}

