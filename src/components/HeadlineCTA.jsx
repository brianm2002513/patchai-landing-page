import Hero from './Hero';

function HeadlineCTA() {

    return (
        <div className='flex flex-col gap-10 space-grotesk-normal text-lg'>
            <Hero className=" h-[6rem] pl-10 heroTerminal text-[3rem]"
                lines={[
                    { text: "Ship cleaner code.", color: "var(--text-primary)" },
                    { text: "Automatically.", color: "var(--text-primary)" },
                ]}
            />
            <div className='pl-10 pb-20 flex gap-4 mt-6'>
                <button className="flex items-center gap-2 text-white px-5 py-5 rounded-full font-medium transition-colors cursor-pointer" style={{ backgroundColor: 'var(--accent)' }}>
                    Download for Windows
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </button>
                <button className="group flex items-center gap-2 border px-5 py-5 rounded-full font-medium transition-colors cursor-pointer" style={{ backgroundColor: 'var(--btn-secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
                    Talk to us
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default HeadlineCTA
