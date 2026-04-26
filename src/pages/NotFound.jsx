import React from 'react';
import { Link } from 'react-router';
import PatchAI3DText from '../components/PatchAI3DText';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-6 text-center space-grotesk-normal" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="flex flex-col items-center gap-8 max-w-2xl animate-in fade-in zoom-in duration-700">
                <div className="relative">
                    <h1 className="text-[10rem] md:text-[15rem] font-bold leading-none select-none opacity-5" style={{ color: 'var(--text-primary)' }}>
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <PatchAI3DText style={{ fontSize: '4rem' }} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold" style={{ color: 'var(--text-primary)' }}>
                        System Error: Page Not Found
                    </h2>
                    <p className="text-xl md:text-2xl font-['Space_Grotesk']" style={{ color: 'var(--text-muted)' }}>
                        Oops! It seems our AI couldn't locate the file you're looking for. <br />
                        The route might have been refactored or deleted.
                    </p>
                </div>

                <Link
                    to="/"
                    className="mt-8 px-10 py-5 rounded-full text-white font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                    style={{ backgroundColor: 'var(--accent)' }}
                >
                    Back to Mainframe
                </Link>

                <div className="mt-20 flex gap-4 text-sm opacity-50" style={{ color: 'var(--text-muted)' }}>
                    <code>[STATUS: 404]</code>
                    <code>[CONTEXT: UNKNOWN_ROUTE]</code>
                    <code>[ACTION: REBOOT_TO_HOME]</code>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
