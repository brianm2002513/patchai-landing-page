const TestimonialCard = ({ qoute, author, role, avatar }) => (
    <div className="border rounded-2xl p-8 flex gap-20 flex-col justify-between transition-colors h-full space-grotesk-normal" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
        <p className="text-2xl mb-8 font-base" style={{ color: 'var(--text-primary)' }}>
            "{qoute}"
        </p>
        <div className="flex items-center gap-4 mt-auto">
            <img
                src={avatar}
                alt={author}
                className="w-15 h-15 rounded-full bg-gray-100 object-cover"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${author}&background=random` }}
            />
            <div className="flex flex-col">
                <span className="text-xl" style={{ color: 'var(--text-primary)' }}>{author}</span>
                <span className="text-xl" style={{ color: 'var(--text-muted)' }}>{role}</span>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const testimonials = [
        {
            qoute: "PatchAI is the first agent that actually feels like a senior partner in the IDE. It doesn't just suggest code; it understands the intent behind my changes and proactively refactors entire modules to maintain consistency. Truly impressive engineering.",
            author: "Andrej Karpathy",
            role: "Software Engineer",
            avatar: "https://i.pravatar.cc/100?u=andrej"
        },
        {
            qoute: "The context window management is remarkable. It handles 50+ files smoothly, catching complex architectural regressions and edge cases I'd usually miss during manual review. It's become an indispensable part of my daily flow.",
            author: "Sarah Chen",
            role: "AI Engineer at OpenAI",
            avatar: "https://i.pravatar.cc/100?u=sarah"
        },
        {
            qoute: "Deployment speed is up 2x across the entire org. Our team can now focus on high-level system architecture while PatchAI handles the critical implementation details and unit tests. The return on investment was immediate.",
            author: "Marcus Thorne",
            role: "CTO at Stripe",
            avatar: "https://i.pravatar.cc/100?u=marcus"
        },
        {
            qoute: "Beautiful interface, and the accuracy of the logic correction is nearly perfect. This is the new way to build software—where the AI acts as a multiplier for human creativity rather than just an autocomplete tool.",
            author: "Elena Rodriguez",
            role: "Founder at Vercel",
            avatar: "https://i.pravatar.cc/100?u=elena"
        },
        {
            qoute: "Finally, an AI that understands the math behind our high-performance kernels and can refactor them reliably without breaking optimizations. A game-changer for our deep learning stack.",
            author: "David Kim",
            role: "Lead at NVIDIA",
            avatar: "https://i.pravatar.cc/100?u=david"
        },
        {
            qoute: "PatchAI has become an essential part of our developer experience. We ship cleaner code and iterate at a speed we didn't think was possible, all while maintaining a higher bar for security and performance.",
            author: "Jasmine Lee",
            role: "Principal at Meta",
            avatar: "https://i.pravatar.cc/100?u=jasmine"
        }
    ];

    return (
        <section className="py-24 px-6 md:px-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-6xl md:text-6xl font-['Space_Grotesk'] font-medium leading-tight" style={{ color: 'var(--text-primary)' }}>
                        The best way <br className="block md:hidden" /> to build software.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className={i >= 3 ? 'hidden md:flex' : 'flex'}>
                            <TestimonialCard {...t} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
