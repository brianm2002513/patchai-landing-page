import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState, useRef, useEffect } from "react";
import ProductDetailCodeBlock from "../codeblocks/ProductDetailCodeBlock";
import CategoryCodeBlock from "../codeblocks/CategoryCodeBlock";
import CategoryProductCodeBlock from "../codeblocks/CategoryProductCodeBlock";
import DBJsonCodeBlock from "../codeblocks/DBJsonCodeBlock"
import UsersCodeBlock from "../codeblocks/UsersCodeBlock"
import ReviewsCodeBlock from "../codeblocks/ReviewsCodeBlock"
import CampgroundsCodeBlock from "../codeblocks/CampgroundsCodeBlock"
import AgentSidebarItem from "./AgentSidebarItem";
import { agentItems } from "../../data/agentItems";


function DemoWindow() {
    const [agentsState, setAgentsState] = useState(
        agentItems.map((a, index) => ({
            ...a,
            status: index === 0 ? "running" : "in-queue",
            progress: 0
        }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setAgentsState(prev => {
                const runningIndex = prev.findIndex(a => a.status === "running");
                if (runningIndex === -1) return prev;

                const runningAgent = prev[runningIndex];
                const nextProgress = Math.min(runningAgent.progress + 0.02, 1);

                if (nextProgress >= 1) {
                    const nextInQueueIndex = prev.findIndex((a, i) => i > runningIndex && a.status === "in-queue");

                    return prev.map((agent, idx) => {
                        if (idx === runningIndex) {
                            return { ...agent, progress: 1, status: "done" };
                        }
                        if (nextInQueueIndex !== -1 && idx === nextInQueueIndex) {
                            return { ...agent, status: "running", progress: 0 };
                        }
                        return agent;
                    });
                }

                return prev.map((agent, idx) => {
                    if (idx === runningIndex) {
                        return { ...agent, progress: nextProgress };
                    }
                    return agent;
                });
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const [scenario, setScenario] = useState(agentItems[0].id);

    const currentScenario = agentItems.find(a => a.id === scenario);

    const currentAgent = agentsState.find(a => a.id === scenario);

    const [files, setFiles] = useState([
        { id: "category", label: "category.jsx" },
        { id: "categoryProduct", label: "categoryProduct.jsx" },
        { id: "productDetail", label: "productDetail.jsx" },
        { id: "db", label: "db.json" },
        { id: "users", label: "users.js" },
        { id: "reviews", label: "reviews.js" },
        { id: "campgrounds", label: "campgrounds.js" },
    ]);

    const timelineRef = useRef(null);

    const [activeFile, setActiveFile] = useState("category");
    const editorRef = useRef(null);

    const [agentMenuOpen, setAgentMenuOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState("Composer 1.5");

    const agentButtonRef = useRef(null);
    const agentMenuRef = useRef(null);

    const [modeMenuOpen, setModeMenuOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState("Agent");

    const modeButtonRef = useRef(null);
    const modeMenuRef = useRef(null);

    const activityRefs = useRef([]);
    const stepRefs = useRef([]);

    const setActivityRef = (el, i) => {
        if (el) activityRefs.current[i] = el;
    };

    const setStepRef = (el, i) => {
        if (el) stepRefs.current[i] = el;
    };

    const taskRef = useRef(null);

    useGSAP(() => {
        if (!currentAgent) return;

        const ctx = gsap.context(() => {

            gsap.killTweensOf([
                taskRef.current,
                ...activityRefs.current,
                ...stepRefs.current
            ]);

            const tl = gsap.timeline({ paused: true });

            tl.fromTo(
                taskRef.current,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.3 }
            );

            tl.fromTo(
                activityRefs.current,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "linear"
                }
            );

            tl.fromTo(
                stepRefs.current,
                { opacity: 0, y: 6 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.5,
                    ease: "linear"
                },
                ">="
            );

            tl.progress(currentAgent.progress);

            if (currentAgent.status === "running") {
                gsap.to(tl, {
                    progress: 1,
                    duration: (1 - currentAgent.progress) * 1.5,
                    ease: "linear"
                });
            }

        })

        return () => ctx.revert();

    }, [scenario]);

    useEffect(() => {
        const tl = timelineRef.current;
        if (!tl || !currentAgent) return;

        gsap.to(tl, {
            progress: currentAgent.progress,
            duration: 0.2,
            ease: "power1.out"
        });

    }, [currentAgent]);

    const inProgress = agentsState.filter(a => a.status === "running");
    const inQueue = agentsState.filter(a => a.status === "in-queue");
    const done = agentsState.filter(a => a.status === "done");

    const removeFile = (id) => {
        setFiles((prev) => {
            const updated = prev.filter((file) => file.id !== id);

            if (updated.length === 0) {
                setActiveFile(null);
                return [];
            }

            if (id === activeFile) {
                const removedIndex = prev.findIndex((f) => f.id === id);
                const nextFile = updated[Math.min(removedIndex, updated.length - 1)];
                setActiveFile(nextFile.id);
            }

            return updated;
        });
    };

    const openFile = (id, label) => {
        setFiles((prev) => {
            const exists = prev.some((file) => file.id === id);

            if (!exists) {
                return [...prev, { id, label }];
            }

            return prev;
        });

        setActiveFile(id);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                agentMenuRef.current &&
                !agentMenuRef.current.contains(e.target) &&
                !agentButtonRef.current.contains(e.target)
            ) {
                setAgentMenuOpen(false);
            }

            if (
                modeMenuRef.current &&
                !modeMenuRef.current.contains(e.target) &&
                !modeButtonRef.current.contains(e.target)
            ) {
                setModeMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sync files/activeFile when scenario changes — setState is intentional here
    // since these values are also independently mutable via user tab interactions
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
    useEffect(() => {
        if (!currentScenario) return;

        setFiles(currentScenario.files);
        setActiveFile(currentScenario.defaultFile);
    }, [scenario]);

    return (
        <>
            <div aria-hidden="true" id="demo-window-cursor-ide" className="group absolute overflow-hidden rounded-[10px] flex flex-col select-none" style={{
                left: "clamp(552px, 50%, 100% - 552px)",
                top: "clamp(300px, 50%, 100% - 340px)",
                width: 1040,
                minWidth: 420,
                height: 616,
                maxHeight: "calc(100% - 64px)",
                minHeight: 260,
                transform: "translate(-50%, -50%) scale(1)",
                transformOrigin: "center center",
                zIndex: 10,
                backgroundColor: 'var(--terminal-bg)',
                color: 'var(--text-primary)',
                boxShadow:
                    "0 28px 70px rgba(0, 0, 0, 0.14), 0 14px 32px rgba(0, 0, 0, 0.1), 0 0 0 0px var(--terminal-border)"
            }}>
                <div className="relative flex h-10 items-center justify-between border-b px-2 cursor-default" style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)' }}>
                    <div className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--terminal-dots)" }} />
                        <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--terminal-dots)" }} />
                        <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: "var(--terminal-dots)" }} />
                    </div>
                    <div className="text-2xl pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-center opacity-70 logo" style={{ color: 'var(--text-primary)' }}>
                        PatchAI
                    </div>
                    <div className="-mr-1 flex items-center">
                        <button type="button" aria-label="Open settings" className="text-theme-text-sec hover:bg-theme-bg-hover inline-flex h-7 w-7 items-center justify-center rounded transition-opacity duration-200 opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" viewBox="0 0 256 256">
                                <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="min-h-0 w-full flex-1 overflow-hidden" data-demo-desktop-content="true">
                    <div className="h-full min-h-0 w-full">
                        <div className="h-full min-h-0 w-full overflow-hidden relative">
                            <div className="flex h-full w-full">
                                <div className="h-full max-w-[320px] min-w-[220px] border-r" style={{ flexGrow: 2, flexBasis: 0, borderColor: 'var(--terminal-border)' }}>
                                    <aside className="h-full w-full" style={{ backgroundColor: 'var(--terminal-header)', color: 'var(--text-primary)' }}>
                                        <div className="pl-0">
                                            <div className="py-1.25">

                                                {/* RUNNING */}
                                                <div className="text-xl px-3 py-1 uppercase">
                                                    Running <span className="text-white/50">{inProgress.length}</span>
                                                </div>

                                                <div>
                                                    {inProgress.map((item) => (
                                                        <AgentSidebarItem
                                                            key={item.id}
                                                            title={item.title}
                                                            description={item.description}
                                                            time={item.time}
                                                            status={item.status}
                                                            active={scenario === item.id}
                                                            onClick={() => setScenario(item.id)}
                                                        />
                                                    ))}
                                                </div>

                                                {/* IN QUEUE */}
                                                {inQueue.length > 0 && (
                                                    <>
                                                        <div className="text-xl px-3 py-1 uppercase mt-3">
                                                            In Queue <span className="text-white/50">{inQueue.length}</span>
                                                        </div>

                                                        <div>
                                                            {inQueue.map((item) => (
                                                                <AgentSidebarItem
                                                                    key={item.id}
                                                                    title={item.title}
                                                                    description="Waiting for previous agents to complete..."
                                                                    time={item.time}
                                                                    status={item.status}
                                                                    active={scenario === item.id}
                                                                    onClick={() => setScenario(item.id)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}

                                                {/* READY */}
                                                <div className="text-xl px-3 py-1 uppercase mt-3">
                                                    Ready for Review <span className="text-white/50">{done.length}</span>
                                                </div>

                                                <div>
                                                    {done.map((item) => (
                                                        <AgentSidebarItem
                                                            key={item.id}
                                                            title={item.title}
                                                            description={item.description}
                                                            time={item.time}
                                                            status={item.status}
                                                            active={scenario === item.id}
                                                            onClick={() => setScenario(item.id)}
                                                        />
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    </aside>
                                </div>
                                <div className="flex h-full w-full flex-row-reverse" style={{ flexGrow: "12.5", flexBasis: 0 }}>
                                    <div className="border-transparent w-full min-w-0 overflow-hidden " style={{ flexGrow: 8, flexBasis: 0 }}>
                                        <div className="flex h-full w-full flex-col" style={{ backgroundColor: 'var(--terminal-bg)' }}>
                                            <div className="text-lg no-scrollbar flex h-15 items-center gap-0 overflow-x-auto overflow-y-hidden" role="tablist" style={{ color: 'var(--text-muted)' }}>
                                                {files.map((file) => (
                                                    <div key={file.id}
                                                        className={`group/tab flex h-full items-center border-r gap-1 pr-2 pl-3 transition-colors ${activeFile === file.id ? "[&>button:last-child]:opacity-100" : ""}`}
                                                        style={{
                                                            backgroundColor: activeFile === file.id ? 'var(--terminal-tab-active)' : 'var(--terminal-tab-inactive)',
                                                            borderColor: 'var(--terminal-border)',
                                                            color: activeFile === file.id ? 'var(--text-primary)' : 'var(--text-muted)'
                                                        }}
                                                    >
                                                        <button type="button" className="flex h-full items-center gap-1.5 truncate" onClick={() => {
                                                            setActiveFile(file.id);
                                                            editorRef.current?.focus({ preventScroll: true });
                                                            // document.getElementById("demo-window-cursor-ide")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                                        }}
                                                        >
                                                            {file.label}
                                                        </button>

                                                        <button type="button" onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeFile(file.id);
                                                        }}
                                                            className="ml-1 flex h-full items-center opacity-0 group-hover/tab:opacity-100"
                                                            title="Close tab"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className="border-theme-border-02 h-full flex-1 " />
                                            </div>
                                            <div className="bg-theme-product-editor relative h-full w-full text-xl" role="tabpanel" id="tabpanel-usage/report.py" aria-labelledby="tab-usage/report.py">
                                                <div ref={editorRef} className="absolute inset-0 box-border min-h-full overflow-hidden pt-0 pl-0 ring-0 outline-none focus:ring-0 focus:outline-none" tabIndex={0}>
                                                    <div className="terminal relative h-full">

                                                        {!activeFile && (
                                                            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xl select-none">
                                                                No File Open
                                                            </div>
                                                        )}
                                                        {activeFile === "db" &&
                                                            <DBJsonCodeBlock />}
                                                        {activeFile === "category" &&
                                                            <CategoryCodeBlock />}
                                                        {activeFile === "categoryProduct" &&
                                                            <CategoryProductCodeBlock />}
                                                        {activeFile === "productDetail" &&
                                                            <ProductDetailCodeBlock />}
                                                        {activeFile === "users" &&
                                                            <UsersCodeBlock />}
                                                        {activeFile === "reviews" &&
                                                            <ReviewsCodeBlock />}
                                                        {activeFile === "campgrounds" &&
                                                            <CampgroundsCodeBlock />}
                                                    </div>
                                                </div>
                                                <div className="pointer-events-none absolute z-10" style={{ display: "none" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="min-w-[340px] border-r" style={{ flexGrow: "2.5", flexBasis: 0, borderColor: 'var(--terminal-border)' }}>
                                        <div className="bg-theme-product-chrome flex h-full w-full flex-col">
                                            <div className="text-lg flex h-8 items-center px-3" style={{ color: 'var(--text-primary)' }}>
                                                <div key={scenario} className="mx-auto w-full max-w-[580px]">
                                                    {currentScenario?.title}
                                                </div>
                                            </div>
                                            <div className="thin-scrollbar flex-1 overflow-auto md:overscroll-y-auto px-3 pt-0">
                                                <div className="mx-auto w-full max-w-[580px]">
                                                    <div className="sticky top-0 z-10">
                                                        <div style={{ backgroundColor: 'var(--terminal-bg)' }}>
                                                            <div ref={taskRef} className="ml-auto w-full rounded-lg border px-2 py-1.5 break-words whitespace-pre-wrap" style={{ fontSize: 13, opacity: 0, backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)', color: 'var(--text-primary)' }}>
                                                                {currentScenario?.taskDescription}
                                                            </div>
                                                        </div>
                                                        <div className="from-theme-product-chrome pointer-events-none h-2 bg-gradient-to-b to-transparent" />
                                                    </div>
                                                    <div className="w-full " style={{ opacity: 1, transform: "none" }}>
                                                        <div className="rounded-lg w-full px-1 py-1">
                                                            <div className="flex flex-col gap-1" style={{ fontSize: 13 }}>
                                                                <div className="gap-1 overflow-hidden">
                                                                    <div className="flex flex-col gap-1.5">
                                                                        {currentScenario?.activities?.map((act, i) => (
                                                                            <div
                                                                                ref={(el) => setActivityRef(el, i)}
                                                                                key={i}
                                                                                className="flex items-center justify-between text-lg"
                                                                                style={{ color: 'var(--text-primary)' }}
                                                                            >
                                                                                <span className="flex items-center gap-1">
                                                                                    <span className="w-1 h-1 bg-white/40 rounded-full" />
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
                                                    <div className="w-full " style={{ opacity: 1, transform: "none" }}>
                                                        {currentScenario?.timeline.map((item, index) => {

                                                            if (item.type === "step") {
                                                                return (
                                                                    <div
                                                                        ref={(el) => setStepRef(el, index)}
                                                                        key={index} className="w-full">
                                                                        <div className="rounded-lg w-full px-1 py-2">
                                                                            <div className="type-product-base text-theme-text" style={{ fontSize: 13 }}>
                                                                                <div className="min-h-[1.5em]">
                                                                                    {currentAgent?.status === "in-queue" ? (
                                                                                        <span className="text-white/40 italic">In Queue...</span>
                                                                                    ) : (
                                                                                        // <Hero
                                                                                        //     key={`${currentScenario.id}-step-${index}`}
                                                                                        //     lines={[
                                                                                        //         `${item.content}`
                                                                                        //     ]}
                                                                                        // />
                                                                                        item.content
                                                                                    )}

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
                                                                        key={index} className="w-full" onClick={() => openFile(item.id, item.label)}
                                                                    >
                                                                        <div className="rounded-lg mt-1 mb-1 cursor-pointer border p-2" style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)', color: 'var(--text-primary)' }}>
                                                                            <div className="flex items-center gap-1.5">
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
                                                    <div className="pointer-events-none sticky bottom-0 z-20 h-2 bg-gradient-to-t to-transparent" />
                                                </div>
                                            </div>
                                            <div className="bg-theme-product-chrome relative z-20 p-3 pt-0">
                                                <div className="mx-auto w-full max-w-[580px]">
                                                    <div className="rounded-lg border" style={{ borderColor: 'var(--terminal-border)' }}>
                                                        <div className="">
                                                            <form className="flex flex-col">
                                                                <textarea name="message" placeholder="Plan, search, build anything..." className="text-theme-text type-product-base max-h-[200px] w-full resize-none bg-transparent px-2 pt-2 pb-1.5 outline-none" rows={1} spellCheck="false" autoCorrect="off" style={{
                                                                    boxSizing: "border-box",
                                                                    fontSize: 13,
                                                                    height: 30,
                                                                    overflow: "visible"
                                                                }} defaultValue={""} />
                                                                <div className="px-2 py-2 pt-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <button type="button" className="type-product-sm flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.75 bg-theme-card-03-hex text-theme-text-sec hover:text-theme-text">
                                                                                <svg width={12} height={12} viewBox="0 0 24.7969 11.3555" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                                                                                    <path d="M0 5.67188C0 9.11719 2.13281 11.3438 5.30859 11.3438C6.98438 11.3438 8.41406 10.6406 9.9375 9.17578L12.2227 6.96094L14.5078 9.17578C16.0312 10.6406 17.4609 11.3438 19.1367 11.3438C22.3125 11.3438 24.4453 9.11719 24.4453 5.67188C24.4453 2.22656 22.3125 0 19.1367 0C17.4609 0 16.0312 0.703125 14.5078 2.16797L12.2227 4.38281L9.9375 2.16797C8.41406 0.703125 6.98438 0 5.30859 0C2.13281 0 0 2.22656 0 5.67188ZM1.91016 5.67188C1.91016 3.36328 3.28125 1.91016 5.30859 1.91016C6.44531 1.91016 7.45312 2.44922 8.60156 3.52734L10.8867 5.67188L8.60156 7.81641C7.45312 8.89453 6.44531 9.43359 5.30859 9.43359C3.28125 9.43359 1.91016 7.98047 1.91016 5.67188ZM13.5586 5.67188L15.8438 3.52734C16.9922 2.44922 18 1.91016 19.1367 1.91016C21.1641 1.91016 22.5352 3.36328 22.5352 5.67188C22.5352 7.98047 21.1641 9.43359 19.1367 9.43359C18 9.43359 16.9922 8.89453 15.8438 7.81641Z" />
                                                                                </svg>
                                                                                <div className="relative">
                                                                                    <button ref={modeButtonRef} type="button" onClick={() => setModeMenuOpen((prev) => !prev)}
                                                                                        className="text-theme-text-sec hover:text-theme-text type-product-sm flex cursor-pointer items-center gap-0.5 rounded-md bg-transparent py-0.75"
                                                                                    >
                                                                                        <span>{selectedMode}</span>

                                                                                        <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-60">
                                                                                            <path d="M7.00342 9.62646C6.86377 9.62646 6.74023 9.57275 6.63818 9.4707L2.48096 5.2168C2.38965 5.12012 2.33594 5.00195 2.33594 4.86768C2.33594 4.58838 2.54541 4.37354 2.82471 4.37354C2.96436 4.37354 3.08789 4.42725 3.17383 4.51318L7.00342 8.42334L10.8276 4.51318C10.9189 4.42725 11.0425 4.37354 11.1768 4.37354C11.4561 4.37354 11.6655 4.58838 11.6655 4.86768C11.6655 5.00195 11.6118 5.12012 11.5205 5.21143L7.36328 9.4707C7.27197 9.57275 7.1377 9.62646 7.00342 9.62646Z" />
                                                                                        </svg>
                                                                                    </button>
                                                                                    {modeMenuOpen && (
                                                                                        <div ref={modeMenuRef} className="absolute bottom-full mb-2 left-0 w-44 rounded-md border shadow-lg z-50" style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)' }}>
                                                                                            {["Agent", "Plan", "Debug", "Ask"].map(
                                                                                                (mode) => (
                                                                                                    <button key={mode} onClick={() => {
                                                                                                        setSelectedMode(mode);
                                                                                                        setModeMenuOpen(false);
                                                                                                    }}
                                                                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80"
                                                                                                        style={{ color: 'var(--text-primary)', backgroundColor: 'transparent' }}
                                                                                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                                                                                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                                                                    >
                                                                                                        {mode}
                                                                                                    </button>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </button>
                                                                            <button type="button" className="text-theme-text-sec hover:text-theme-text type-product-sm flex cursor-pointer items-center gap-0.5 rounded-md bg-transparent py-0.75">
                                                                                <div className="relative">
                                                                                    <button ref={agentButtonRef} type="button" onClick={() => setAgentMenuOpen((prev) => !prev)}
                                                                                        className="text-theme-text-sec hover:text-theme-text type-product-sm flex cursor-pointer items-center gap-0.5 rounded-md bg-transparent py-0.75"
                                                                                    >
                                                                                        <span>{selectedAgent}</span>

                                                                                        <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-60">
                                                                                            <path d="M7.00342 9.62646C6.86377 9.62646 6.74023 9.57275 6.63818 9.4707L2.48096 5.2168C2.38965 5.12012 2.33594 5.00195 2.33594 4.86768C2.33594 4.58838 2.54541 4.37354 2.82471 4.37354C2.96436 4.37354 3.08789 4.42725 3.17383 4.51318L7.00342 8.42334L10.8276 4.51318C10.9189 4.42725 11.0425 4.37354 11.1768 4.37354C11.4561 4.37354 11.6655 4.58838 11.6655 4.86768C11.6655 5.00195 11.6118 5.12012 11.5205 5.21143L7.36328 9.4707C7.27197 9.57275 7.1377 9.62646 7.00342 9.62646Z" />
                                                                                        </svg>
                                                                                    </button>

                                                                                    {agentMenuOpen && (
                                                                                        <div ref={agentMenuRef} className="absolute bottom-full mb-2 left-0 w-44 rounded-md border shadow-lg z-50" style={{ backgroundColor: 'var(--terminal-header)', borderColor: 'var(--terminal-border)' }}>
                                                                                            {["Composer 1.5", "Codex 5.3", "Sonnet 4.5", "Opus 4.6"].map(
                                                                                                (agent) => (
                                                                                                    <button key={agent} onClick={() => {
                                                                                                        setSelectedAgent(agent);
                                                                                                        setAgentMenuOpen(false);
                                                                                                    }}
                                                                                                        className="w-full text-left px-3 py-2 text-sm hover:bg-opacity-80"
                                                                                                        style={{ color: 'var(--text-primary)', backgroundColor: 'transparent' }}
                                                                                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                                                                                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                                                                    >
                                                                                                        {agent}
                                                                                                    </button>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </div>

                                                                            </button>
                                                                        </div>
                                                                        <button aria-label="Send message" type="submit" className="flex h-5 w-5 items-center justify-center rounded-full transition-all duration-150 bg-theme-card-04-hex text-theme-text-sec" disabled="">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="currentColor" viewBox="0 0 256 256">
                                                                                <path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-2 top-0 h-2 cursor-ns-resize" data-resize-handle="true" />
                <div className="absolute inset-x-2 bottom-0 h-2 cursor-ns-resize" data-resize-handle="true" />
                <div className="absolute inset-y-2 right-0 w-1 cursor-ew-resize" data-resize-handle="true" />
                <div className="absolute inset-y-2 left-0 w-1 cursor-ew-resize" data-resize-handle="true" />
                <div className="absolute top-0 left-0 h-2.5 w-2.5 cursor-nwse-resize" data-resize-handle="true" />
                <div className="absolute top-0 right-0 h-2.5 w-2.5 cursor-nesw-resize" data-resize-handle="true" />
                <div className="absolute bottom-0 left-0 h-2.5 w-2.5 cursor-nesw-resize" data-resize-handle="true" />
                <div className="absolute right-0 bottom-0 h-2.5 w-2.5 cursor-nwse-resize" data-resize-handle="true" />
            </div>

        </>
    )
}

export default DemoWindow
