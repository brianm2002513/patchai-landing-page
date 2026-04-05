import { useState, useRef, useCallback } from "react";
import CodeBlock1 from "../codeblocks/CodeBlock1";
import CodeBlock2 from "../codeblocks/CodeBlock2";

const files = [
    { id: "file1", label: "app.jsx", badge: "fix" },
    { id: "file2", label: "utils.js", badge: "correct" },
];

const codeBlocks = {
    file1: CodeBlock1,
    file2: CodeBlock2,
};

export default function CodeEditor() {
    const [activeFile, setActiveFile] = useState("file1");
    const manualSwitch = useRef(false);

    const handleAnimationComplete = useCallback(() => {
        manualSwitch.current = false;
        setTimeout(() => {
            if (!manualSwitch.current) {
                setActiveFile((prev) =>
                    prev === "file1" ? "file2" : "file1"
                );
            }
        }, 2000);
    }, []);

    const handleTabClick = (id) => {
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
        <div className="flex h-full w-full flex-col select-none" style={{ backgroundColor: 'var(--terminal-bg)' }}>
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
            <div className="text-lg no-scrollbar flex h-15 items-center gap-0 overflow-x-auto overflow-y-hidden" role="tablist" style={{ color: 'var(--text-muted)' }}>
                {files.map((file) => (
                    <div
                        key={file.id}
                        className={`group/tab flex h-full items-center border-r gap-1 pr-2 pl-3 transition-colors ${activeFile === file.id
                            ? "text-primary [&>button:last-child]:opacity-100"
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
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full leading-none ${file.badge === "fix" ? "bg-green-500/20 text-green-400" :
                                    "bg-blue-500/20 text-blue-400"
                                    }`}>
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
                            ✕
                        </button>
                    </div>
                ))}
                <div className="h-full flex-1 border-r" style={{ borderColor: 'var(--terminal-border)' }} />
            </div>
            <div className="relative h-full w-full" role="tabpanel">
                <div className="absolute inset-0 box-border min-h-full overflow-hidden pt-0 pl-0 ring-0 outline-none focus:ring-0 focus:outline-none" tabIndex={0}>
                    <div className="terminal relative h-full text-lg">
                        {!activeFile && (
                            <div className="absolute inset-0 flex items-center justify-center select-none" style={{ color: 'var(--text-muted)' }}>
                                No File Open
                            </div>
                        )}
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
    );
}
