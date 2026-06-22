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
    const route = [
        { x: 180, y: 180 },
        { x: 216, y: 180 },
        { x: 252, y: 180 },
        { x: 288, y: 180 },
        { x: 324, y: 180 },
        { x: 360, y: 180 },
        { x: 396, y: 180 },
        { x: 432, y: 180 },
        { x: 432, y: 144 },
        { x: 432, y: 108 },
        { x: 396, y: 108 },
        { x: 360, y: 108 },
        { x: 324, y: 108 },
        { x: 288, y: 108 },
        { x: 252, y: 108 },
        { x: 216, y: 108 },
        { x: 180, y: 108 },
        { x: 180, y: 144 },
    ];
    const segmentCount = 5;
    const animationDuration = 7.2;
    const foodEvents = [
        {
            x: 436,
            y: 184,
            opacity: [1, 1, 0, 0],
            scale: [0.9, 1.08, 0.1, 0.1],
            times: [0, 0.36, 0.39, 1],
            eatAt: 0.39,
        },
        {
            x: 256,
            y: 112,
            opacity: [0, 0, 1, 1, 0, 0],
            scale: [0.1, 0.1, 0.9, 1.08, 0.1, 0.1],
            times: [0, 0.43, 0.46, 0.75, 0.78, 1],
            eatAt: 0.78,
        },
    ];
    const particleDirections = [
        { x: -18, y: -15 },
        { x: 18, y: -13 },
        { x: -16, y: 17 },
        { x: 17, y: 16 },
    ];
    const positionsForSegment = (segmentIndex: number) => {
        const positions = Array.from({ length: route.length + 1 }, (_, step) => {
            const routeIndex = (step - segmentIndex + route.length) % route.length;
            return route[routeIndex];
        });

        return {
            x: positions.map(position => position.x),
            y: positions.map(position => position.y),
        };
    };

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
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 360" aria-hidden="true">
                <defs>
                    <filter id="snake-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="7" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {foodEvents.map((food, foodIndex) => (
                    <g key={foodIndex}>
                        <motion.rect
                            x={food.x}
                            y={food.y}
                            width="24"
                            height="24"
                            rx="6"
                            fill="#fbbf24"
                            filter="url(#snake-glow)"
                            animate={{
                                opacity: food.opacity,
                                scale: food.scale,
                            }}
                            transition={{
                                duration: animationDuration,
                                repeat: Infinity,
                                ease: 'linear',
                                times: food.times,
                            }}
                            style={{ transformOrigin: `${food.x + 12}px ${food.y + 12}px` }}
                        />

                        {particleDirections.map((direction, particleIndex) => (
                            <motion.circle
                                key={particleIndex}
                                cx={food.x + 12}
                                cy={food.y + 12}
                                r="3"
                                fill="#fde68a"
                                animate={{
                                    x: [0, 0, direction.x, direction.x],
                                    y: [0, 0, direction.y, direction.y],
                                    opacity: [0, 0, 1, 0],
                                }}
                                transition={{
                                    duration: animationDuration,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                    times: [0, food.eatAt - 0.01, food.eatAt, food.eatAt + 0.09],
                                }}
                            />
                        ))}

                        <motion.text
                            x={food.x + 12}
                            y={food.y - 4}
                            textAnchor="middle"
                            fill="#fde68a"
                            fontSize="16"
                            fontWeight="700"
                            animate={{
                                y: [food.y - 4, food.y - 4, food.y - 24, food.y - 30],
                                opacity: [0, 0, 1, 0],
                            }}
                            transition={{
                                duration: animationDuration,
                                repeat: Infinity,
                                ease: 'easeOut',
                                times: [0, food.eatAt - 0.01, food.eatAt, food.eatAt + 0.12],
                            }}
                        >
                            +1
                        </motion.text>
                    </g>
                ))}

                {Array.from({ length: segmentCount }, (_, index) => {
                    const positions = positionsForSegment(index);
                    const isHead = index === 0;

                    return (
                        <motion.g
                            key={index}
                            initial={{ x: positions.x[0], y: positions.y[0] }}
                            animate={{ x: positions.x, y: positions.y }}
                            transition={{
                                duration: animationDuration,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            <rect
                                width="32"
                                height="32"
                                rx="8"
                                fill={isHead ? '#6ee7b7' : index < 3 ? '#10b981' : '#059669'}
                                stroke={isHead ? '#a7f3d0' : '#34d399'}
                                strokeWidth="2"
                                filter={isHead ? 'url(#snake-glow)' : undefined}
                            />
                            {isHead && (
                                <>
                                    <circle cx="22" cy="10" r="3" fill="#071a16" />
                                    <circle cx="22" cy="22" r="3" fill="#071a16" />
                                </>
                            )}
                        </motion.g>
                    );
                })}
            </svg>
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
