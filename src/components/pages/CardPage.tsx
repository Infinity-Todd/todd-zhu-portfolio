'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CardItem, CardPageConfig } from '@/types/page';

const BASE_PATH = '/todd-zhu-portfolio';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

function SnakePreview() {
    const segments = [
        { left: '24%', top: '56%', delay: 0 },
        { left: '18%', top: '56%', delay: 0.08 },
        { left: '12%', top: '56%', delay: 0.16 },
        { left: '12%', top: '68%', delay: 0.24 },
    ];

    return (
        <div
            className="absolute inset-0 overflow-hidden bg-[#071a16]"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
            }}
            role="img"
            aria-label="Animated preview of a reinforcement-learning agent playing Snake"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(74,222,128,0.18),transparent_35%)]" />
            <motion.div
                className="absolute left-[72%] top-[32%] h-4 w-4 rounded-sm bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.8)]"
                animate={{ scale: [1, 1.25, 1], rotate: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
            />
            {segments.map((segment, index) => (
                <motion.div
                    key={index}
                    className={`absolute h-6 w-6 rounded-md border border-emerald-300/60 ${
                        index === 0
                            ? 'bg-emerald-300 shadow-[0_0_22px_rgba(110,231,183,0.7)]'
                            : 'bg-emerald-500'
                    }`}
                    style={{ left: segment.left, top: segment.top }}
                    animate={{
                        x: [0, 72, 144, 216, 216, 144, 72, 0],
                        y: [0, 0, 0, 0, -64, -64, -64, 0],
                    }}
                    transition={{
                        duration: 5,
                        delay: segment.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {index === 0 && (
                        <>
                            <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-[#071a16]" />
                            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#071a16]" />
                        </>
                    )}
                </motion.div>
            ))}
            <div className="absolute bottom-4 left-4 rounded-full border border-emerald-300/20 bg-black/35 px-3 py-1 text-xs font-medium tracking-wide text-emerald-100 backdrop-blur-sm">
                PPO agent
            </div>
        </div>
    );
}

function MediaCard({ item, index }: { item: CardItem; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 * index }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
        >
            {item.link && (
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    aria-label={`View ${item.title} on GitHub`}
                >
                    <span className="sr-only">View {item.title} on GitHub</span>
                </a>
            )}

            <div className="relative aspect-video overflow-hidden bg-neutral-950">
                {item.video && (
                    <video
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={`${BASE_PATH}${item.video}`}
                        aria-label={item.media_alt || item.title}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    />
                )}
                {item.preview === 'snake' && <SnakePreview />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-55" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Live preview
                </div>
                <div className="absolute right-4 top-4 translate-y-1 rounded-full border border-white/20 bg-black/35 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ExternalLink className="h-4 w-4" />
                </div>
            </div>

            <div className="p-5 sm:p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold leading-tight text-primary transition-colors group-hover:text-accent">
                        {item.title}
                    </h3>
                    {item.date && (
                        <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800">
                            {item.date}
                        </span>
                    )}
                </div>
                {item.subtitle && <p className="mb-3 text-sm font-medium text-accent">{item.subtitle}</p>}
                {item.content && (
                    <div className="line-clamp-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
                        <ReactMarkdown components={markdownComponents}>{item.content}</ReactMarkdown>
                    </div>
                )}
                {item.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span
                                key={tag}
                                className="rounded border border-neutral-100 bg-neutral-50 px-2 py-1 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.article>
    );
}

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const isMediaLayout = config.variant === 'media';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={embedded ? "mb-4" : "mb-8"}>
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-4`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className={`grid ${embedded ? "gap-4" : "gap-6"} ${isMediaLayout ? "md:grid-cols-2" : ""}`}>
                {config.items.map((item, index) => isMediaLayout ? (
                    <MediaCard key={item.title} item={item} index={index} />
                ) : (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`relative bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}
                    >
                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                                aria-label={`View ${item.title}`}
                            >
                                <span className="sr-only">View {item.title}</span>
                            </a>
                        )}
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary`}>
                                {item.title}
                                {item.link && <span className="ml-2 text-accent text-sm" aria-hidden="true">↗</span>}
                            </h3>
                            {item.date && (
                                <span className="text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                    {item.date}
                                </span>
                            )}
                        </div>
                        {item.subtitle && (
                            <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-3`}>{item.subtitle}</p>
                        )}
                        {item.content && (
                            <div className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                <ReactMarkdown components={markdownComponents}>
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        )}
                        {item.tags && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
