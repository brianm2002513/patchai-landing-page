import React from 'react';

/* ── Abstract SVG Visualizations ── */

const LineChart = () => (
    <svg viewBox="0 0 300 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Multiple overlapping growth lines */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
                key={i}
                d={`M 0 ${190 - i * 8} Q 75 ${180 - i * 12 - Math.random() * 20}, 150 ${140 - i * 10} T 300 ${60 - i * 6}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity={0.4 + i * 0.08}
            />
        ))}
        {/* Primary growth line */}
        <path
            d="M 0 185 Q 60 170, 120 130 T 200 70 T 300 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
        />
    </svg>
);

const DotGrid = () => {
    const rows = 12;
    const cols = 14;
    return (
        <svg viewBox="0 0 280 240" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => {
                    // Create a contribution-graph-like pattern — denser towards bottom-right
                    const intensity = Math.random();
                    const weight = (r / rows) * 0.4 + (c / cols) * 0.3 + intensity * 0.3;
                    const size = weight > 0.5 ? 4 + weight * 4 : 3;
                    const opacity = weight > 0.35 ? 0.15 + weight * 0.5 : 0.08;
                    return (
                        <rect
                            key={`${r}-${c}`}
                            x={c * 20 + 2}
                            y={r * 20 + 2}
                            width={size}
                            height={size}
                            rx="1"
                            fill="currentColor"
                            opacity={opacity}
                        />
                    );
                })
            )}
        </svg>
    );
};

const BarChart = () => {
    const bars = 24;
    return (
        <svg viewBox="0 0 300 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {Array.from({ length: bars }).map((_, i) => {
                const height = 30 + Math.random() * 140 + (i / bars) * 40;
                const opacity = 0.2 + (i / bars) * 0.4 + Math.random() * 0.15;
                return (
                    <rect
                        key={i}
                        x={i * 12.5}
                        y={200 - height}
                        width="3"
                        height={height}
                        fill="currentColor"
                        opacity={opacity}
                        rx="1.5"
                    />
                );
            })}
        </svg>
    );
};

/* ── Main Component ── */

const GrowthSection = () => {
    return (
        <section className="py-24 px-6 md:px-10 border-t border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-[1600px] mx-auto">
                {/* Text Content */}
                <div className="mb-20">
                    <h2 className="text-5xl font-['Space_Grotesk'] font-medium mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        The agentic AI coding assistant
                    </h2>
                    <p className="font-['JetBrains_Mono'] text-2xl md:text-2xl leading-relaxed max-w-3xl" style={{ color: 'var(--text-muted)' }}>
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>[*]</span>{' '}
                        With over <span className="font-bold" style={{ color: 'var(--text-primary)' }}>50,000</span> downloads,{' '}
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>2,400</span> active teams, and over{' '}
                        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>1.2M</span> patches shipped, PatchAI is used
                        and trusted by developers at every scale.
                    </p>
                </div>

                {/* Data Visualizations */}
                <div className="hidden md:grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <div className="w-full h-[200px] mb-6" style={{ color: 'var(--text-accent)' }}>
                            <LineChart />
                        </div>
                        <p className="font-['JetBrains_Mono'] text-sm" style={{ color: 'var(--text-muted)' }}>
                            Fig 1. <span className="font-bold" style={{ color: 'var(--text-primary)' }}>50K</span> Downloads
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full h-[200px] mb-6" style={{ color: 'var(--text-accent)' }}>
                            <DotGrid />
                        </div>
                        <p className="font-['JetBrains_Mono'] text-sm" style={{ color: 'var(--text-muted)' }}>
                            Fig 2. <span className="font-bold" style={{ color: 'var(--text-primary)' }}>2,400</span> Teams
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-full h-[200px] mb-6" style={{ color: 'var(--text-accent)' }}>
                            <BarChart />
                        </div>
                        <p className="font-['JetBrains_Mono'] text-sm" style={{ color: 'var(--text-muted)' }}>
                            Fig 3. <span className="font-bold" style={{ color: 'var(--text-primary)' }}>1.2M</span> Patches Shipped
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthSection;
