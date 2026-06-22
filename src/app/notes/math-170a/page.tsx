import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Math170ANotesClient, { type Math170ALecture } from '@/components/notes/Math170ANotesClient';

const BASE_PATH = '/todd-zhu-portfolio';
const NOTES_DIRECTORY = path.join(process.cwd(), 'content', 'math-170a');

function lectureNumber(filename: string): number {
  return Number(filename.match(/\d+/)?.[0] || Number.MAX_SAFE_INTEGER);
}

function prepareObsidianMarkdown(content: string): string {
  return content
    .replace(
      /!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g,
      (_, filename: string) =>
        `![${filename}](${BASE_PATH}/notes/math-170a/assets/${encodeURIComponent(filename)})`,
    )
    .replace(
      /^>\s*\[!([^\]]+)\][+-]?\s*(.*)$/gm,
      (_, kind: string, title: string) =>
        `> **${kind.charAt(0).toUpperCase() + kind.slice(1)}${title ? ` · ${title}` : ''}**`,
    );
}

function loadLectures(): Math170ALecture[] {
  return fs
    .readdirSync(NOTES_DIRECTORY)
    .filter(filename => filename.endsWith('.md'))
    .sort((a, b) => lectureNumber(a) - lectureNumber(b))
    .map(filename => {
      const raw = fs.readFileSync(path.join(NOTES_DIRECTORY, filename), 'utf8');
      const title = raw.match(/^#\s+(.+)$/m)?.[1] || filename.replace(/\.md$/, '');

      return {
        id: filename.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-'),
        number: lectureNumber(filename),
        title,
        content: prepareObsidianMarkdown(raw),
      };
    });
}

export const metadata: Metadata = {
  title: 'MATH 170A Notes',
  description: 'Lecture notes for MATH 170A: Introduction to Numerical Linear Algebra.',
};

export default function Math170ANotesPage() {
  return <Math170ANotesClient lectures={loadLectures()} />;
}
