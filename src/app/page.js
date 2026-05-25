import Link from "next/link";

export default function Home() {

  return (

    <main className="min-h-screen bg-[#f5f5f5]">

      {/* HERO */}

      <section className="bg-black text-white py-24 px-6 text-center">

        <h1 className="text-6xl md:text-7xl font-bold">

          Digital Manuscript Library

        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">

          Explore rare Sanskrit manuscripts,
          ancient books, Urdu archives,
          and historical collections.

        </p>

      </section>

      {/* MAIN OPTIONS */}

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-10">

        {/* MANUSCRIPTS */}

        <Link href="/manuscripts">

          <div className="bg-white rounded-3xl shadow-xl p-12 hover:scale-105 transition duration-300 cursor-pointer">

            <div className="text-8xl mb-6">

              📜

            </div>

            <h2 className="text-5xl font-bold">

              Manuscripts

            </h2>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed">

              Browse thousands of rare Sanskrit
              manuscripts from major Indian
              collections and archives.

            </p>

          </div>

        </Link>

        {/* BOOKS */}

        <Link href="/books">

          <div className="bg-white rounded-3xl shadow-xl p-12 hover:scale-105 transition duration-300 cursor-pointer">

            <div className="text-8xl mb-6">

              📚

            </div>

            <h2 className="text-5xl font-bold">

              Books

            </h2>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed">

              Explore ancient books,
              research texts, Urdu collections,
              and Sanskrit literature.

            </p>

          </div>

        </Link>

      </section>

    </main>
  );
}