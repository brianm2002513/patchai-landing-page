import { useState } from "react";
import DemoWindow from "./DemoWindow";

function DemoStage({ bgImage }) {
    const [restartKey, setRestartKey] = useState(0);

    return (
        <div className="p-5">
            <div className="relative w-full h-[700px] rounded-lg z-0 overflow-hidden">
                <img
                    src={bgImage}
                    alt=""
                    className="relative left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 object-cover rounded-lg w-[1500px] h-[700px]"
                />
                <DemoWindow key={restartKey} />

                {/* Restart button */}
                <button
                    onClick={() => setRestartKey(k => k + 1)}
                    aria-label="Restart demo animations"
                    title="Restart demo"
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 20,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "background 0.2s, transform 0.2s",
                        color: "rgba(255,255,255,0.75)",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                        e.currentTarget.style.transform = "rotate(-30deg) scale(1.1)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.transform = "rotate(0deg) scale(1)";
                    }}
                >
                    {/* Restart / refresh arrow icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default DemoStage
