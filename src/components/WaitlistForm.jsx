import React, { useState } from 'react';

const WaitlistForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call and store in localStorage for demo purposes
        // In a real app, this would be a fetch call to a backend/Supabase
        setTimeout(() => {
            try {
                const waitlist = JSON.parse(localStorage.getItem('patchai_waitlist') || '[]');
                if (!waitlist.some(entry => entry.email === email)) {
                    waitlist.push({ email, date: new Date().toISOString() });
                    localStorage.setItem('patchai_waitlist', JSON.stringify(waitlist));
                }

                setStatus('success');
                setMessage('You are on the list! We will be in touch.');
                setEmail('');
            } catch {
                setStatus('error');
                setMessage('Something went wrong. Please try again.');
            }
        }, 1200);
    };

    if (status === 'success') {
        return (
            <div className="flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/20 rounded-full animate-in fade-in zoom-in duration-500 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-green-600 dark:text-green-400 font-bold text-base md:text-lg whitespace-nowrap">{message}</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="relative flex w-full max-w-lg group">
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border-2 border-[var(--border)] rounded-full px-6 md:px-8 py-4 md:py-5 pr-44 md:pr-48 outline-none focus:border-[var(--accent)] transition-all shadow-sm group-hover:shadow-md text-base md:text-lg"
                disabled={status === 'loading'}
            />
            <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 px-4 md:px-8 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full font-bold text-sm md:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] md:min-w-[140px]"
            >
                {status === 'loading' ? (
                    <svg className="animate-spin h-5 w-5 md:h-6 md:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Join Waitlist'}
            </button>
            {status === 'error' && (
                <p className="absolute -bottom-8 left-6 text-red-500 text-sm font-medium">{message}</p>
            )}
        </form>
    );
};

export default WaitlistForm;
