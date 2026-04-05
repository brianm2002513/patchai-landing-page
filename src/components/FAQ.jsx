import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const iconRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out',
                onUpdate: () => window.refreshLayout ? window.refreshLayout() : ScrollTrigger.refresh()
            });
            gsap.to(iconRef.current, {
                rotation: 180,
                duration: 0.3
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in',
                onUpdate: () => window.refreshLayout ? window.refreshLayout() : ScrollTrigger.refresh()
            });
            gsap.to(iconRef.current, {
                rotation: 0,
                duration: 0.3
            });
        }
    }, { dependencies: [isOpen], scope: contentRef });

    return (
        <div className="border-t last:border-b" style={{ borderColor: 'var(--border)' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 md:py-10 flex items-center gap-6 md:gap-10 text-left transition-colors cursor-pointer group"
                style={{ backgroundColor: 'transparent' }}
            >
                <div ref={iconRef} className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-light" style={{ color: 'var(--text-primary)' }}>
                        {isOpen ? '−' : '+'}
                    </span>
                </div>
                <h3 className="font-['JetBrains_Mono'] text-xl md:text-3xl font-medium leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {question}
                </h3>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden h-0 opacity-0"
            >
                <div className="pb-8 md:pb-12 pl-14 md:pl-20 pr-6 md:pr-14">
                    <p className="font-['JetBrains_Mono'] text-lg md:text-2xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqData = [
        {
            question: "What is PatchAI?",
            answer: "PatchAI is an advanced AI coding assistant that goes beyond simple line completion. It understands entire files, identifies logic errors, and automatically generates fixes across your entire codebase."
        },
        {
            question: "Does it integrate with my IDE?",
            answer: "Yes, PatchAI has extensions for VS Code, IntelliJ, and more, allowing it to work directly within your development environment while maintaining full context of your open projects."
        },
        {
            question: "Is my code safe?",
            answer: "We prioritize security. PatchAI processes code using enterprise-grade encryption, and we offer on-premise solutions for teams with strict compliance requirements. Your IP is never used for training without explicit consent."
        },
        {
            question: "Can it generate boilerplate?",
            answer: "Absolutely. From Express routes to complex React components, PatchAI can scaffold and wire up complete features in seconds, including unit tests and documentation."
        },
        {
            question: "How does the pricing work?",
            answer: "We offer a free tier for individual developers and scalable team plans. Check our full pricing page for details on enterprise deployments and custom integration support."
        }
    ];

    return (
        <section className="py-24 px-6 md:px-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="w-full">
                <div className="mb-16">
                    <h2 className="text-5xl md:text-6xl font-['Space_Grotesk'] font-medium leading-tight" style={{ color: 'var(--text-primary)' }}>
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className="flex flex-col">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
