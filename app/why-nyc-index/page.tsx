import Link from "next/link";

export default function WhyNYCIndex() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 md:py-20">
      <article className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            # Why NYC Index
          </h2>
        </header>

        <div className="space-y-6 text-base leading-relaxed">
          <p>
            I'm good at running through walls. CS degree with 1.0, two PhDs with honors in parallel — whatever the obstacle, I'll find a way. That has never been my problem.
          </p>

          <p>
            My problem is choosing the right wall.
          </p>

          <p>
            I built Ark: profitable, growing, fine – and personally unsatisfying. A small company solving a small problem. I learned: I'd be deeply unhappy looking back on my 30s having built profitable but irrelevant companies. I want to find a problem so ambitious that even if it fails, I'll have happily spent a decade on it.
          </p>

          <p>
            I don't have it yet.
          </p>

          <p>
            This year is dedicated to finding it. For four months, I was an engineer at Langfuse, seeing what it looks like to build a global product with ambition baked into the DNA. Now I'm engineer in residence at an early-stage fund, finding the idea worth my next decade.
          </p>

          <p>
            I understand there are CVs with flashier logos. What I have is clarity and determination.
          </p>

          <p>
            Great cities attract ambitious people and ambitious people sharpen each other. New York may be the greatest city of them all. I want to be in a room full of founders who chose missions worth a decade.
          </p>

          <p>
            <Link href="/" className="font-semibold underline">
              Ambition
            </Link>{" "}
            is contagious after all.
          </p>

          <p className="opacity-60 mt-8">
            – Michael
          </p>
        </div>
      </article>
    </main>
  );
}
