
import PatchAI3DText from '../PatchAI3DText';
import ThemeToggle from '../ThemeToggle';

function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--bg-card)' }} className="mt-16">
            <div className="mx-auto w-full max-w-[1160px] mt-15 mb-10 h-full px-6 xl:px-8 flex flex-col gap-35 justify-between">
                {/* Top section */}
                <div className="grid grid-cols-12 gap-8 gap-y-16 pt-12 xl:pt-20">
                    {/* Nav columns */}
                    <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-y-16 md:col-span-8">
                        <div className="flex flex-col gap-8 col-span-1 font-['Space_Grotesk']">
                            <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Product</h3>
                            <ul className="flex flex-col gap-4 text-3xl">
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Overview</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Features</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Integrations</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Pricing</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-8 col-span-1 font-['Space_Grotesk']">
                            <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Resources</h3>
                            <ul className="flex flex-col gap-4 text-3xl">
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Documentation</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>API Reference</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Guides</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Blog</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-8 col-span-1 font-['Space_Grotesk']">
                            <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Company</h3>
                            <ul className="flex flex-col gap-4 text-3xl">
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>About</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Careers</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Contact</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-8 col-span-1 font-['Space_Grotesk']">
                            <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Legal</h3>
                            <ul className="flex flex-col gap-4 text-3xl">
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Privacy Policy</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Terms of Service</a></li>
                                <li><a href="#" className="text-2xl" style={{ color: 'var(--text-accent)' }}>Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mb-8 flex flex-col justify-between gap-10 text-2xl font-['Space_Grotesk'] md:flex-row md:items-end md:pb-10">
                    <div className="flex w-full flex-col gap-6">
                        <div className="flex w-full items-center gap-6 flex-wrap">
                            <span className="hidden md:inline" style={{ color: 'var(--text-accent)' }}>&copy; 2026 PatchAI</span>
                            <nav>
                                <ul className="flex items-center gap-6 flex-wrap">
                                    <li><a href="#" style={{ color: 'var(--text-accent)' }}>Privacy Policy</a></li>
                                    <li><a href="#" style={{ color: 'var(--text-accent)' }}>Terms &amp; Conditions</a></li>
                                    <li><a href="#" style={{ color: 'var(--text-accent)' }}>Cookie Preferences</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                        <span className="md:hidden" style={{ color: 'var(--text-accent)' }}>&copy; 2026 PatchAI</span>
                        <div className="flex items-center justify-end gap-4">
                            {/* LinkedIn */}
                            <a href="#" aria-label="LinkedIn" className="flex w-7 h-7 md:w-8 md:h-8 items-center justify-center transition-colors" style={{ color: 'var(--text-accent)' }}>
                                <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                                    <path d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z" fill="currentColor" />
                                </svg>
                            </a>
                            {/* X / Twitter */}
                            <a href="#" aria-label="X" className="flex w-7 h-7 md:w-8 md:h-8 items-center justify-center transition-colors" style={{ color: 'var(--text-accent)' }}>
                                <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                                    <path d="M17.728 3H20.7815L14.1105 10.6246L21.9585 21H15.8135L11.0006 14.7074L5.49354 21H2.43815L9.57354 12.8446L2.04492 3H8.34585L12.6963 8.75169L17.728 3ZM16.6563 19.1723H18.3483L7.42646 4.73169H5.61077L16.6563 19.1723Z" fill="currentColor" />
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a href="#" aria-label="YouTube" className="flex w-7 h-7 md:w-8 md:h-8 items-center justify-center transition-colors" style={{ color: 'var(--text-accent)' }}>
                                <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.2043 4.00776C21.1084 4.28763 21.8189 5.10925 22.0609 6.15475C22.4982 8.04786 22.5 12 22.5 12C22.5 12 22.5 15.9522 22.0609 17.8453C21.8189 18.8908 21.1084 19.7124 20.2043 19.9922C18.5673 20.5 12 20.5 12 20.5C12 20.5 5.43274 20.5 3.79568 19.9922C2.89159 19.7124 2.1811 18.8908 1.93908 17.8453C1.5 15.9522 1.5 12 1.5 12C1.5 12 1.5 8.04786 1.93908 6.15475C2.1811 5.10925 2.89159 4.28763 3.79568 4.00776C5.43274 3.5 12 3.5 12 3.5C12 3.5 18.5673 3.5 20.2043 4.00776ZM15.5134 12.0003L9.79785 15.2999V8.70065L15.5134 12.0003Z" fill="currentColor" />
                                </svg>
                            </a>
                            <div className="ml-2">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
