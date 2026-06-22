import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Linear Algebra Notes',
  description: 'Linear algebra course notes and study materials.',
};

export default function LinearAlgebraNotesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/notes/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        All note subjects
      </Link>

      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Subject</p>
        <h1 className="font-serif text-4xl font-bold text-primary sm:text-5xl">Linear Algebra</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-500">
          Courses and lecture notes covering theoretical and numerical linear algebra.
        </p>
      </header>

      <section aria-labelledby="courses-heading">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="courses-heading" className="text-2xl font-semibold text-primary">Courses</h2>
          <span className="text-sm text-neutral-500">1 course</span>
        </div>

        <Link
          href="/notes/math-170a/"
          className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="grid md:grid-cols-[12rem_minmax(0,1fr)]">
            <div className="flex min-h-44 items-center justify-center bg-gradient-to-br from-accent/25 via-accent/10 to-transparent p-8">
              <div className="relative">
                <BookOpen className="h-20 w-20 text-accent transition-transform duration-300 group-hover:scale-110" strokeWidth={1.25} />
                <FileText className="absolute -bottom-2 -right-3 h-9 w-9 rounded-lg bg-background p-1.5 text-primary shadow-md" />
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">MATH 170A</p>
                  <h3 className="text-2xl font-semibold text-primary transition-colors group-hover:text-accent">
                    Introduction to Numerical Linear Algebra
                  </h3>
                </div>
                <ArrowRight className="mt-1 h-5 w-5 text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-accent" />
              </div>

              <p className="max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-500">
                Matrix factorizations, conditioning, least squares, SVD, eigenvalue algorithms,
                and iterative methods.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50">
                  26 lectures
                </span>
                <span className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50">
                  Numerical Linear Algebra
                </span>
                <span className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50">
                  MATLAB
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
