import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatItem = ({ number, suffix, label, alignment = 'center' }) => {
    const numberRef = useRef();

    useGSAP(() => {
        const target = { val: 0 };
        gsap.to(target, {
            val: number,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: numberRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            onUpdate: () => {
                if (numberRef.current) {
                    numberRef.current.innerText = Math.floor(target.val);
                }
            }
        });
    }, [number]);

    if (alignment === 'side') {
        return (
            <div className="flex items-center gap-6 justify-center md:justify-start">
                <span className="text-[5rem] md:text-[6.5rem] font-bold leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    <span ref={numberRef}>0</span>{suffix}
                </span>
                <span className="text-lg md:text-xl font-['Space_Grotesk'] leading-tight max-w-[180px]" style={{ color: 'var(--text-muted)' }}>
                    {label}
                </span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center gap-2">
            <span className="text-[5rem] md:text-[6.5rem] font-bold leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>
                <span ref={numberRef}>0</span>{suffix}
            </span>
            <span className="text-lg md:text-xl font-['Space_Grotesk']" style={{ color: 'var(--text-muted)' }}>
                {label}
            </span>
        </div>
    );
};

const StatisticsSection = () => {
    return (
        <section className="py-24 px-6">
            <div className="max-w-[1160px] mx-auto flex flex-col gap-20">
                <h2 className="text-3xl md:text-6xl font-medium text-center max-w-3xl mx-auto leading-tight font-['Space_Grotesk']" style={{ color: 'var(--text-primary)' }}>
                    Trusted by the largest builder community in AI
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center">
                    <StatItem
                        number={12}
                        suffix="M+"
                        label="Commits analyzed and patched"
                    />
                    <StatItem
                        number={50}
                        suffix="K+"
                        label="Active developers"
                    />
                    <StatItem
                        number={9}
                        label="Of the Fortune 10 use PatchAI"
                        alignment="side"
                    />
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;
