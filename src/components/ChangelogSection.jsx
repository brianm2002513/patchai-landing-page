import React from 'react';
import { Link } from 'react-router';

const ChangelogCard = ({ version, date, title, href }) => (
    <Link
        to={href}
        className="flex-1 min-w-[280px] border rounded-3xl p-8 flex flex-col gap-6 text-left transition-colors"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
        <div className="flex justify-between items-center">
            <span className="px-3 py-1 border rounded-full text-xl tracking-tight" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                {version}
            </span>
            <span className="text-xl uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
                {date}
            </span>
        </div>
        <h3 className="text-2xl font-['Space_Grotesk'] leading-tight" style={{ color: 'var(--text-primary)' }}>
            {title}
        </h3>
    </Link>
);

const ChangelogSection = () => {
    const miniUpdates = [
        {
            version: "v1.2",
            date: "APR 4",
            title: "Redesigned Developer Experience",
            href: "/changelog"
        },
        {
            version: "v1.1",
            date: "MAR 28",
            title: "Dynamic AI Route Generation",
            href: "/changelog"
        },
        {
            version: "v1.0",
            date: "MAR 27",
            title: "The Agentic Future is Here",
            href: "/changelog"
        }
    ];

    return (
        <section className="py-24 px-5">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <span className="text-3xl font-base font-['Space_Grotesk']" style={{ color: 'var(--text-muted)' }}>
                        Changelog
                    </span>
                </div>

                <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
                    {miniUpdates.map((update, idx) => (
                        <div key={idx} className="flex-none w-[85vw] md:w-[400px] snap-start">
                            <ChangelogCard {...update} />
                        </div>
                    ))}
                </div>

                <div className="">
                    <Link
                        to="/changelog"
                        className="text-2xl font-bold hover:opacity-70 transition-opacity inline-flex items-center gap-3 group font-['Space_Grotesk']"
                        style={{ color: 'var(--text-accent)' }}
                    >
                        See what's new in PatchAI
                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ChangelogSection;
