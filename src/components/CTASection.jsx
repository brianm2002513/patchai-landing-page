import { useState, useEffect } from 'react';
import PatchAI3DText from './PatchAI3DText';

const CTASection = () => {
    const [device, setDevice] = useState('Desktop');

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Win") !== -1) setDevice("Windows");
        else if (userAgent.indexOf("Mac") !== -1) setDevice("macOS");
        else if (userAgent.indexOf("X11") !== -1) setDevice("Linux");
        else if (userAgent.indexOf("Linux") !== -1) setDevice("Linux");
        else if (userAgent.indexOf("Android") !== -1) setDevice("Android");
        else if (userAgent.indexOf("iPhone") !== -1) setDevice("iOS");
    }, []);

    return (
        <section className="py-16 px-6 md:px-10">
            <div className="mx-auto rounded-[3rem] p-12 md:p-12 text-center flex flex-col items-center gap-8 overflow-hidden relative group">
                {/* Subtle background glow */}
                {/*<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5e452b]/5 blur-[100px] pointer-events-none transition-all duration-1000 group-hover:bg-[#5e452b]/10" />*/}

                <h2 className="text-4xl md:text-8xl font-['Space_Grotesk'] font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                    Try <PatchAI3DText style={{ fontSize: 'inherit' }} /> now.
                </h2>

                <p className="text-xl md:text-2xl max-w-2xl font-['Space_Grotesk']" style={{ color: 'var(--text-accent)' }}>
                    Join thousands of developers who are shipping better code faster with AI-native patching.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button className="group flex items-center gap-3 text-white px-8 py-5 rounded-full font-bold text-lg transition-all cursor-pointer shadow-xl" style={{ backgroundColor: 'var(--accent)' }}>
                        Download for {device}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24"
                            viewBox="0 0 24 24"
                            fill="none" stroke="currentColor"
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>

                    <button className="flex items-center gap-2 border-2 px-8 py-5 rounded-full font-bold text-lg transition-all cursor-pointer" style={{ backgroundColor: 'var(--btn-secondary-bg)', color: 'var(--text-accent)', borderColor: 'var(--btn-secondary-border)' }}>
                        View Documentation
                    </button>
                </div>

                <div className="mt-8 text-xl font-medium" style={{ color: 'var(--text-muted)' }}>
                    Available for all major operating systems.
                </div>
            </div>
        </section>
    );
};

export default CTASection;
