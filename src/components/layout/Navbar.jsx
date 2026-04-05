import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { Link } from 'react-router';
import PatchAI3DText from '../PatchAI3DText';
import ThemeToggle from '../ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    {
        label: 'Product',
        dropdown: [
            { label: 'AI Patching', description: 'Automated code fixes for modern teams.', href: '#' },
            { label: 'Enterprise', description: 'Security and scale for large organizations.', href: '#' },
            { label: 'Integrations', description: 'Works with your favorite IDEs and tools.', href: '#' },
            { label: 'API', description: 'Build your own custom patching workflows.', href: '#' }
        ]
    },
    { label: 'Pricing', href: '#' },
    {
        label: 'Use Cases',
        dropdown: [
            { label: 'Web Development', description: 'Speed up frontend and backend iterations.', href: '#' },
            { label: 'Data Science', description: 'Debug complex data processing scripts.', href: '#' },
            { label: 'Legacy Modernization', description: 'Refactor old codebases with ease.', href: '#' },
            { label: 'Mobile Apps', description: 'Catch logic errors in your mobile apps.', href: '#' }
        ]
    },
    {
        label: 'Resources',
        dropdown: [
            { label: 'Documentation', href: '#' },
            { label: 'Changelog', href: '/changelog' },
            { label: 'Blog', href: '#' },
            { label: 'Community', href: '#' },
            { label: 'Help Center', href: '#' }
        ]
    }
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [expandedMenu, setExpandedMenu] = useState(null);

    const dropdownRef = useRef(null);
    const headerRef = useRef(null);
    const desktopmenuRef = useRef(null);
    const tlRef = useRef(null);

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .to(dropdownRef.current, {
                translateY: '0%',
                height: "100vh",
                duration: 0.4,
                ease: 'none',
            })
    }, []);

    useGSAP(() => {
        gsap.set(desktopmenuRef.current, { xPercent: 20 })
        const anim = gsap.timeline({ paused: true })
            .to(desktopmenuRef.current, { xPercent: 0, duration: 0.2, ease: 'none' })
            .set(headerRef.current, { borderColor: 'var(--border)' }, 0);

        ScrollTrigger.create({
            trigger: headerRef.current,
            start: "bottom 0%",
            animation: anim,
            toggleActions: "play none none reverse",
        });
    }, { scope: desktopmenuRef });

    useEffect(() => {
        if (tlRef.current) {
            if (isOpen) tlRef.current.play();
            else tlRef.current.reverse();
        }
    }, [isOpen]);

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleMobileMenuClick = (label) => {
        setExpandedMenu(expandedMenu === label ? null : label);
    };

    return (
        <header ref={headerRef} className='w-full flex flex-col border-b border-transparent fixed top-0 left-0 z-50 space-grotesk-normal' style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}>
            <div className='flex justify-between px-8 py-5 md:px-8 items-center'>
                <Link to="/" className="flex items-center gap-3">
                    <img src="/patchai-logo.svg" alt="PatchAI" className="w-13 h-13" />
                    <PatchAI3DText style={{ fontSize: '2.5rem' }} />
                </Link>

                {/* Desktop Menu */}
                <nav ref={desktopmenuRef} className='hidden md:flex gap-6 items-center text-xl space-grotesk-normal' style={{ color: 'var(--text-primary)' }}>
                    {NAV_LINKS.map((link) => (
                        <div
                            key={link.label}
                            className="relative group py-4"
                            onMouseEnter={() => setActiveDropdown(link.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1 cursor-pointer hover:text-black transition-colors">
                                {link.label}
                                {link.dropdown && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                                )}
                            </button>

                            {link.dropdown && activeDropdown === link.label && (
                                <div className={`absolute top-full pt-2 w-[300px] pointer-events-auto opacity-0 animate-in fade-in slide-in-from-top-2 duration-200 ${link.label === 'Resources' ? 'right-0' : 'left-1/2 -translate-x-1/2'}`} style={{ opacity: 1 }}>
                                    <div className="rounded-2xl shadow-xl overflow-hidden p-4 flex flex-col gap-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', borderWidth: '1px' }}>
                                        {link.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.label}
                                                to={subItem.href}
                                                className="flex flex-col p-3 rounded-lg group/item"
                                            >
                                                <span className="group-hover/item:opacity-70 transition-colors" style={{ color: 'var(--text-primary)' }}>{subItem.label}</span>
                                                {subItem.description && (
                                                    <span className="text-base leading-snug" style={{ color: 'var(--text-muted)' }}>{subItem.description}</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pl-4 flex items-center gap-6" style={{ borderLeft: '1px solid var(--border)' }}>
                        <button className="transition-colors cursor-pointer" style={{ color: 'var(--text-primary)' }}>Sign in</button>
                        <ThemeToggle />
                        <button className="text-white px-6 py-2 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>Download</button>
                    </div>
                </nav>

                {/* Mobile Icons */}
                <div className="md:hidden flex gap-5 text-2xl items-center cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                    <div className='space-grotesk-normal text-3xl'>Sign in</div>
                    <button
                        onClick={toggleMenu}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        style={{
                            width: 28,
                            height: 20,
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        <span style={{
                            display: 'block',
                            height: 2,
                            width: '100%',
                            background: 'currentColor',
                            borderRadius: 2,
                            transformOrigin: 'center',
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: isOpen ? 'translateY(9px) rotate(45deg)' : 'none',
                        }} />
                        <span style={{
                            display: 'block',
                            height: 2,
                            width: '100%',
                            background: 'currentColor',
                            borderRadius: 2,
                            transition: 'opacity 0.2s ease',
                            opacity: isOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: 'block',
                            height: 2,
                            width: '100%',
                            background: 'currentColor',
                            borderRadius: 2,
                            transformOrigin: 'center',
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                            transform: isOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
                        }} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                ref={dropdownRef}
                className='dropdown__menu md:hidden overflow-y-auto fixed inset-0 top-25 z-40 transition-transform flex flex-col' style={{ height: '0vh', translateY: '-100%', opacity: 1, backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}
            >
                <div className="flex flex-col px-6 pb-6 pt-0 gap-2">
                    {NAV_LINKS.map((link) => (
                        <div key={link.label} className="last:border-0 overflow-hidden" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <button
                                onClick={() => link.dropdown ? handleMobileMenuClick(link.label) : null}
                                className="w-full flex justify-between items-center py-5 text-3xl" style={{ color: 'var(--text-primary)' }}
                            >
                                {link.label}
                                {link.dropdown && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${expandedMenu === link.label ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                                )}
                            </button>

                            {link.dropdown && (
                                <div className={`transition-all duration-300 ease-in-out ${expandedMenu === link.label ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="flex flex-col gap-6 pl-4" style={{ borderLeft: '2px solid var(--border)' }}>
                                        {link.dropdown.map((subItem) => (
                                            <Link key={subItem.label} to={subItem.href} className="flex flex-col gap-1" onClick={() => setIsOpen(false)}>
                                                <span className="text-2xl" style={{ color: 'var(--text-primary)' }}>{subItem.label}</span>
                                                {subItem.description && (
                                                    <span className="text-lg" style={{ color: 'var(--text-muted)' }}>{subItem.description}</span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex justify-between items-center py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                            <span className="text-3xl" style={{ color: 'var(--text-primary)' }}>Theme</span>
                            <ThemeToggle />
                        </div>
                        <button className="text-3xl py-5" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}>Sign in</button>
                        <button className="w-full text-white py-6 rounded-2xl text-2xl mt-4 shadow-xl" style={{ backgroundColor: 'var(--accent)' }}>Download for free</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
