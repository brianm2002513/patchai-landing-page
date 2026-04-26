import Hero from './Hero';
import WaitlistForm from './WaitlistForm';

function HeadlineCTA() {

    return (
        <div id="waitlist" className='flex flex-col gap-10 space-grotesk-normal text-lg'>
            <Hero className=" h-[6rem] pl-10 heroTerminal text-[3rem]"
                lines={[
                    { text: "Ship cleaner code.", color: "var(--text-primary)" },
                    { text: "Automatically.", color: "var(--text-primary)" },
                ]}
            />
            <div className='pl-10 pb-20 flex flex-col gap-6 mt-6'>
                <WaitlistForm />
                <div className='flex gap-4'>
                    <button className="group flex items-center gap-2 border px-5 py-3 rounded-full font-medium transition-all cursor-pointer hover:bg-[var(--btn-secondary-border)]" style={{ backgroundColor: 'var(--btn-secondary-bg)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
                        Talk to us
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeadlineCTA
