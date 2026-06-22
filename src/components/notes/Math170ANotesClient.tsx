'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export interface Math170ALecture {
  id: string;
  number: number;
  title: string;
  content: string;
}

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="mb-6 font-serif text-3xl font-bold text-primary">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-4 mt-10 border-b border-neutral-200 pb-2 text-2xl font-semibold text-primary dark:border-neutral-800">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-semibold text-primary">{children}</h3>,
  p: ({ children }) => <p className="mb-4 leading-7 text-neutral-700 dark:text-neutral-600">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-neutral-700 dark:text-neutral-600">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-neutral-700 dark:text-neutral-600">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-r-xl border-l-4 border-accent bg-accent/5 px-5 py-4 text-neutral-700 dark:text-neutral-600">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    return isBlock ? (
      <code className={`${className} font-mono text-sm`}>{children}</code>
    ) : (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-neutral-200 bg-neutral-950 p-4 text-neutral-100 dark:border-neutral-800">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border border-neutral-200 bg-neutral-100 px-3 py-2 text-left dark:border-neutral-700 dark:bg-neutral-800">{children}</th>,
  td: ({ children }) => <td className="border border-neutral-200 px-3 py-2 dark:border-neutral-700">{children}</td>,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ''}
      className="mx-auto my-7 max-h-[34rem] max-w-full rounded-xl border border-neutral-200 bg-white object-contain shadow-sm dark:border-neutral-800"
      loading="lazy"
    />
  ),
  hr: () => <hr className="my-9 border-neutral-200 dark:border-neutral-800" />,
};

export default function Math170ANotesClient({ lectures }: { lectures: Math170ALecture[] }) {
  const [selectedId, setSelectedId] = useState(lectures[0]?.id || '');
  const [query, setQuery] = useState('');

  const filteredLectures = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return lectures;
    return lectures.filter(lecture => lecture.title.toLowerCase().includes(normalized));
  }, [lectures, query]);

  const selectedIndex = Math.max(0, lectures.findIndex(lecture => lecture.id === selectedId));
  const selectedLecture = lectures[selectedIndex];

  const chooseLecture = (id: string) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!selectedLecture) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Course Notes</p>
        <h1 className="font-serif text-4xl font-bold text-primary">MATH 170A</h1>
        <p className="mt-3 max-w-3xl text-lg text-neutral-600 dark:text-neutral-500">
          Introduction to Numerical Linear Algebra · 26 lecture notes
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 lg:sticky lg:top-24">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search lectures"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-neutral-700 dark:bg-neutral-800"
            />
          </label>

          <nav className="mt-4 max-h-[65vh] space-y-1 overflow-y-auto pr-1" aria-label="MATH 170A lectures">
            {filteredLectures.map(lecture => (
              <button
                key={lecture.id}
                type="button"
                onClick={() => chooseLecture(lecture.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  selectedId === lecture.id
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary dark:text-neutral-500 dark:hover:bg-neutral-800'
                }`}
              >
                <span className="font-semibold">Lecture {lecture.number}</span>
                <span className="mt-0.5 block truncate text-xs opacity-80">
                  {lecture.title.replace(/^Lecture \d+\s*[-–—]\s*/, '')}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 rounded-2xl border border-neutral-200 bg-white px-5 py-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:px-8 lg:px-10">
          <article className="min-w-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {selectedLecture.content}
            </ReactMarkdown>
          </article>

          <div className="mt-12 flex items-center justify-between gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <button
              type="button"
              disabled={selectedIndex === 0}
              onClick={() => chooseLecture(lectures[selectedIndex - 1].id)}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-500"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-neutral-500">
              {selectedIndex + 1} / {lectures.length}
            </span>
            <button
              type="button"
              disabled={selectedIndex === lectures.length - 1}
              onClick={() => chooseLecture(lectures[selectedIndex + 1].id)}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-500"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
