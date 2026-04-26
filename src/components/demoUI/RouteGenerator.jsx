import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CampgroundsCodeBlock from "../codeblocks/CampgroundsCodeBlock";
import ReviewsCodeBlock from "../codeblocks/ReviewsCodeBlock";
import UsersCodeBlock from "../codeblocks/UsersCodeBlock";

const scenario = {
    id: "Routes",
    title: "Generate Routes",
    description: "Create routes for campgrounds, reviews and users.",
    taskDescription:
        "Can you create routes for accessing campgrounds, reviews as well as endpoints allowing users to register and login",
    activities: [
        { label: "Thought", time: "10s" },
        { label: "Searched", time: "Routes file structure" },
        { label: "Read", time: "Individual route functionalities" },
    ],
    timeline: [
        {
            type: "step",
            content: "I will generate login and register endpoints for a user."
        },
        {
            type: "file",
            id: "users",
            label: "users.js",
            additions: "+18",
            deletions: "-2"
        },
        {
            type: "step",
            content: "I will generate HTTP get calls allowing users to query campgrounds."
        },
        {
            type: "file",
            id: "campgrounds",
            label: "campgrounds.js",
            additions: "+28",
            deletions: "-6"
        },
        {
            type: "step",
            content: "Finally, I will generate get and post HTTP queries allowing users to read and also post comments on campgrounds."
        },
        {
            type: "file",
            id: "reviews",
            label: "reviews.js",
            additions: "+13",
            deletions: "-0"
        },
    ]
};

const files = [
    { id: "campgrounds", label: "campgrounds.js", badge: "create" },
    { id: "reviews", label: "reviews.js", badge: "create" },
    { id: "users", label: "users.js", badge: "create" },
];

const codeBlocks = {
    campgrounds: CampgroundsCodeBlock,
    reviews: ReviewsCodeBlock,
    users: UsersCodeBlock,
};

export default function RouteGenerator() {
    const [activeFile, setActiveFile] = useState("campgrounds");
    const manualSwitch = useRef(false);

    const taskRef = useRef(null);
    const activityRefs = useRef([]);
    const stepRefs = useRef([]);

    const setActivityRef = (el, i) => {
        if (el) activityRefs.current[i] = el;
    };

    const setStepRef = (el, i) => {
        if (el) stepRefs.current[i] = el;
    };

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.killTweensOf([
                taskRef.current,
                ...activityRefs.current,
                ...stepRefs.current
            ]);

            const tl = gsap.timeline();

            tl.fromTo(
                taskRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.5 }
            );

            tl.fromTo(
                activityRefs.current,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.6,
                    ease: "power2.out"
                }
            );

            tl.fromTo(
                stepRefs.current,
                { opacity: 0, y: 6 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.5,
                    ease: "power2.out"
                },
                ">="
            );
        });

        return () => ctx.revert();
    }, []);

    const handleAnimationComplete = useCallback(() => {
        manualSwitch.current = false;
        setTimeout(() => {
            if (!manualSwitch.current) {
                setActiveFile((prev) => {
                    const idx = files.findIndex((f) => f.id === prev);
                    return files[(idx + 1) % files.length].id;
                });
            }
        }, 2000);
    }, []);

    const handleTabClick = (id) => {
        manualSwitch.current = true;
        setActiveFile(id);
    };

    const openFile = (id) => {
        manualSwitch.current = true;
        setActiveFile(id);
    };

    const removeFile = (id) => {
        const newFiles = files.filter((file) => file.id !== id);
        if (id === activeFile && newFiles.length > 0) {
            manualSwitch.current = true;
            setActiveFile(newFiles[0].id);
        }
    };

    const ActiveBlock = codeBlocks[activeFile];

    return (
        <div className="flex h-full w-full flex-col select-none space-grotesk-normal overflow-hidden" style={{ backgroundColor: 'var(--terminal-bg)', color: 'var(--text-primary)' }}>
            <div className="relative flex h-10 items-center justify-between border-b px-2 cursor-default" style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)' }}>
                <div className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--terminal-dots)" }} />
                    <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--terminal-dots)" }} />
                    <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--terminal-dots)" }} />
                </div>
                <div className="text-2xl pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-center opacity-70 logo" style={{ color: 'var(--text-primary)' }}>
                    PatchAI
                </div>
                <div />
            </div>
            <div className="flex min-h-0 w-full flex-1 overflow-hidden">
                {/* Agent process panel — left side */}
                <div className="min-w-[220px] border-r" style={{ flexGrow: "5", flexBasis: 0, borderColor: 'var(--terminal-border)' }}>
                    <div className="p-1 flex h-full w-full flex-col" style={{ backgroundColor: 'var(--terminal-bg)' }}>
                        <div className="flex h-8 items-center px-3 text-lg">
                            <div className="mx-auto w-full max-w-[580px] truncate" style={{ color: 'var(--text-primary)' }}>
                                {scenario.title}
                            </div>
                        </div>
                        <div className="thin-scrollbar flex-1 overflow-hidden px-3 pt-0">
                            <div className="mx-auto w-full max-w-[580px]">
                                <div className="sticky top-0 z-10">
                                    <div>
                                        <div
                                            ref={taskRef}
                                            className="ml-auto w-full rounded-lg border px-2 py-1.5 break-words whitespace-pre-wrap"
                                            style={{ fontSize: 13, opacity: 0, backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)', color: 'var(--text-primary)' }}
                                        >
                                            {scenario.taskDescription}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="rounded-lg w-full px-1 py-5">
                                        <div className="flex flex-col gap-1" style={{ fontSize: 13 }}>
                                            <div className="gap-1 overflow-hidden">
                                                <div className="flex flex-col gap-1.5">
                                                    {scenario.activities.map((act, i) => (
                                                        <div
                                                            ref={(el) => setActivityRef(el, i)}
                                                            key={i}
                                                            className="flex items-center justify-between text-lg"
                                                            style={{ color: 'var(--text-muted)' }}
                                                        >
                                                            <span className="flex items-center gap-1">
                                                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-muted)', opacity: 0.4 }} />
                                                                {act.label}
                                                            </span>
                                                            <span className="opacity-50">{act.time}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    {scenario.timeline.map((item, index) => {
                                        if (item.type === "step") {
                                            return (
                                                <div
                                                    ref={(el) => setStepRef(el, index)}
                                                    key={index}
                                                    className="w-full"
                                                >
                                                    <div className="rounded-lg w-full px-1 py-2">
                                                        <div style={{ fontSize: 13 }}>
                                                            <div className="min-h-[1.5em]" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (item.type === "file") {
                                            return (
                                                <div
                                                    ref={(el) => setStepRef(el, index)}
                                                    key={index}
                                                    className="w-full cursor-pointer"
                                                    onClick={() => openFile(item.id)}
                                                >
                                                    <div className="rounded-lg mt-1 mb-1 border p-2" style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)' }}>
                                                        <div className="flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                                                            <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor">
                                                                <path d="M4.14746 12.7578C3.03564 12.7578 2.48242 12.1992 2.48242 11.0767V2.92871C2.48242 1.81152 3.04102 1.24219 4.14746 1.24219H6.69873C7.30029 1.24219 7.63867 1.3335 8.04688 1.75244L11.0063 4.76562C11.436 5.20605 11.5166 5.50684 11.5166 6.19971V11.0767C11.5166 12.1938 10.9634 12.7578 9.85156 12.7578H4.14746ZM4.18506 11.8931H9.80859C10.3672 11.8931 10.6519 11.5977 10.6519 11.0605V6.2373H7.59033C6.91895 6.2373 6.58057 5.9043 6.58057 5.22754V2.10693H4.19043C3.63184 2.10693 3.34717 2.41309 3.34717 2.94482V11.0605C3.34717 11.5977 3.63184 11.8931 4.18506 11.8931ZM7.68701 5.42627H10.4854L7.3916 2.27344V5.12549C7.3916 5.34033 7.47217 5.42627 7.68701 5.42627Z" />
                                                            </svg>
                                                            <span className="font-medium">{item.label}</span>
                                                            <span className="text-green-400 ml-1.5">{item.additions}</span>
                                                            <span className="text-red-400 ml-0.5">{item.deletions}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code editor — right side */}
                <div className="w-full min-w-0 overflow-hidden" style={{ flexGrow: "12.5", flexBasis: 0 }}>
                    <div className="flex h-full w-full flex-col" style={{ backgroundColor: 'var(--terminal-bg)' }}>
                        <div className="text-lg no-scrollbar flex h-10 items-center gap-0 overflow-x-auto overflow-y-hidden" role="tablist" style={{ color: 'var(--text-muted)' }}>
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className={`group/tab flex h-full items-center border-r gap-1 pr-5 pl-3 transition-colors ${activeFile === file.id
                                        ? "[&>button:last-child]:opacity-100"
                                        : ""
                                        }`}
                                    style={{ 
                                        backgroundColor: activeFile === file.id ? 'var(--terminal-tab-active)' : 'var(--terminal-tab-inactive)',
                                        borderColor: 'var(--terminal-border)',
                                        color: activeFile === file.id ? 'var(--text-primary)' : 'var(--text-muted)'
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="flex h-full items-center gap-1.5 truncate"
                                        onClick={() => handleTabClick(file.id)}
                                    >
                                        {file.label}
                                        {activeFile === file.id && (
                                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none bg-green-500/20 text-green-400">
                                                {file.badge}
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile(file.id);
                                        }}
                                        className="ml-1 flex h-full items-center opacity-0 group-hover/tab:opacity-100"
                                        title="Close tab"
                                    >
                                        &#10005;
                                    </button>
                                </div>
                            ))}
                            <div className="h-full flex-1 border-r" style={{ borderColor: 'var(--terminal-border)' }} />
                        </div>
                        <div className="relative h-full w-full" role="tabpanel">
                            <div className="absolute inset-0 box-border min-h-full overflow-hidden pt-0 pl-0 ring-0 outline-none focus:ring-0 focus:outline-none" tabIndex={0}>
                                <div className="terminal relative h-full text-lg">
                                    {activeFile && (
                                        <ActiveBlock
                                            key={activeFile}
                                            onComplete={handleAnimationComplete}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
