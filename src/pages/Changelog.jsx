import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import faqImage from '../assets/images/changelog_faq_feature.png';
import routesImage from '../assets/images/changelog_routes_feature.png';

const VersionPill = ({ version }) => (
    <div className="px-3 py-1 border rounded-full text-xl font-base inline-flex items-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
        {version}
    </div>
);

const AccordionItem = ({ title, count, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            });
        }
    }, [isOpen]);

    return (
        <div className="mt-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 transition-colors font-semibold text-lg group"
                style={{ color: 'var(--text-muted)' }}
            >
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                {title} ({count})
            </button>
            <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
                <div className="pt-6 pl-8 space-y-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ChangelogEntry = ({ date, version, title, description, image, subUpdates }) => (
    <div className="flex flex-col md:flex-row gap-8 md:gap-24 py-20 last:border-0 group" style={{ borderBottom: '1px solid var(--border)' }}>
        {/* Left Column: Metadata */}
        <div className="w-full md:w-[120px] flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 pt-2">
            <VersionPill version={version} />
            <span className="font-base text-xl tracking-tight whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{date}</span>
        </div>

        {/* Right Column: Content */}
        <div className="flex-1 max-w-4xl">
            <h2 className="text-5xl font-['Space_Grotesk'] font-medium mb-8 tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
                {title}
            </h2>
            <p className="text-2xl mb-12 leading-relaxed font-['Space_Grotesk']" style={{ color: 'var(--text-muted)' }}>
                {description}
            </p>
            {image && (
                <div className="rounded-3xl overflow-hidden border shadow-2xl mb-12 transform group-hover:scale-[1.01] transition-transform duration-500" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                    <img src={image} alt={title} className="w-full object-cover" />
                </div>
            )}

            <div className="space-y-4">
                {subUpdates && subUpdates.map((group, idx) => (
                    <AccordionItem key={idx} title={group.title} count={group.items.length}>
                        <ul className="list-disc space-y-3 ml-4 text-xl" style={{ color: 'var(--text-muted)' }}>
                            {group.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </AccordionItem>
                ))}
            </div>
        </div>
    </div>
);

const Changelog = () => {
    const updates = [
        {
            date: "APR 4, 2026",
            version: "v1.2",
            title: "Redesigned Developer Experience",
            description: "A major update focused on the core developer experience. We've introduced a cleaner, high-performance FAQ section and streamlined the navigation across the entire dashboard.",
            image: faqImage,
            subUpdates: [
                {
                    title: "Improvements",
                    items: [
                        "Brand new FAQ section with minimalist accordion logic and GSAP animations",
                        "Switched core typography to JetBrains Mono for a terminal-inspired feel",
                        "Added support for complex JSX transformations in the code correction engine",
                        "Updated the design system with new spacing tokens and cleaner dividers"
                    ]
                },
                {
                    title: "Bug Fixes",
                    items: [
                        "Fixed mobile menu positioning when scroll lock is active",
                        "Resolved a flicker in the statistics counter during page navigation",
                        "Corrected logic error in the Route Generator's middleware detection"
                    ]
                }
            ]
        },
        {
            date: "MAR 28, 2026",
            version: "v1.1",
            title: "Dynamic AI Route Generation",
            description: "Generate complete backend routes in seconds. PatchAI now analyzes your controllers to create full API structures automatically, removing hours of manual boilerplate.",
            image: routesImage,
            subUpdates: [
                {
                    title: "New Features",
                    items: [
                        "Interactive Route Generator supporting Express.js and Fastify",
                        "Deep middleware analysis for better route security generation",
                        "Automatic unit test generation for newly created routes"
                    ]
                },
                {
                    title: "Performance",
                    items: [
                        "40% faster local processing for projects with over 100 code files",
                        "Reduced bundle size by 15% through optimized shiki integration"
                    ]
                }
            ]
        },
        {
            date: "MAR 27, 2026",
            version: "v1.0",
            title: "The Agentic Future is Here",
            description: "Initial launch of PatchAI. The first AI coding assistant that acts as a true senior partner in your IDE, capable of understanding and refactoring multi-file architectures.",
            subUpdates: [
                {
                    title: "Launch Highlights",
                    items: [
                        "Advanced multi-file context understanding",
                        "Automated logical correction engine",
                        "Developer-first UI with dark mode components"
                    ]
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
                {/* Hero */}
                <div className="mb-10 md:mb-20">
                    <h1 className="text-sm font-['Space_Grotesk'] font-medium mb-8 tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                        Changelog
                    </h1>
                    <p className="text-3xl leading-tight font-medium font-['Space_Grotesk']" style={{ color: 'var(--text-muted)' }}>
                        A running journal of every update, improvement, and fix we've shipped to PatchAI.
                    </p>
                </div>

                {/* Entries */}
                <div className="flex flex-col">
                    {updates.map((update, index) => (
                        <ChangelogEntry key={index} {...update} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Changelog;
