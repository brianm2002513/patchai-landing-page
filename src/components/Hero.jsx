import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

function Hero({ lines = [], className = "", showCursor = true, triggerOnScroll = false }) {
    const terminalRef = useRef(null);
    const cursorTweenRef = useRef(null);
    const queueRef = useRef(Promise.resolve());

    useGSAP(() => {
        const terminal = terminalRef.current;

        const wait = (t) => new Promise((res) => setTimeout(res, t));

        function createLine() {
            const line = document.createElement("div");
            line.classList.add("line");

            const text = document.createElement("span");
            text.classList.add("text");

            line.appendChild(text);

            if (showCursor) {
                const cursor = document.createElement("span");
                cursor.classList.add("cursor");
                line.appendChild(cursor);

                terminal.querySelectorAll(".cursor").forEach((c) => {
                    if (c !== cursor) c.remove();
                });

                if (cursorTweenRef.current) {
                    cursorTweenRef.current.kill();
                }

                cursorTweenRef.current = gsap.to(cursor, {
                    opacity: 0,
                    repeat: -1,
                    yoyo: true,
                    duration: 0.6,
                    ease: "power2.inOut",
                });
            }

            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;

            return text;
        }

        async function typeLine(text, options = {}) {
            const { speed = 0.04, color = "#c9d1d9", delay = 500 } = options;

            const textEl = createLine();
            textEl.style.color = color;

            await gsap
                .to(textEl, {
                    text,
                    duration: text.length * speed,
                    ease: "none",
                });
            return await wait(delay);
        }

        function addLine(line) {
            queueRef.current = queueRef.current.then(() => {
                if (typeof line === "string") {
                    return typeLine(line);
                } else {
                    return typeLine(line.text, line);
                }
            });
        }

        window.typeToTerminal = addLine;

        if (triggerOnScroll) {
            ScrollTrigger.create({
                trigger: terminal,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    lines.forEach((line) => addLine(line));
                },
            });
        } else {
            lines.forEach((line) => addLine(line));
        }

    }, { scope: terminalRef });

    return <h1 className={`${className}`} ref={terminalRef}></h1>;
}

export default Hero;
