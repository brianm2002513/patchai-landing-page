import { useEffect, useState, useRef } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "../../context/ThemeContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const codeBefore = `{
  "name": "my-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^17.0.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}`;

const corrections = [
  { line: 8, fix: '    "react": "^18.2.0",' },
];

function runCorrection(tl, container, buggyIdx, correctionText) {
  const lines = Array.from(container.querySelectorAll(".code-line"));
  const buggyLine = lines[buggyIdx];
  if (!buggyLine) return;

  const lineContent = buggyLine.querySelector(".line-content");
  if (!lineContent) return;
  buggyLine.style.position = "relative";

  const cursor = document.createElement("span");
  cursor.className = "fix-cursor";
  buggyLine.appendChild(cursor);

  const annotation = buggyLine.querySelector(".change-annotation");
  if (annotation) annotation.style.opacity = "0";

  const correctionLine = document.createElement("div");
  correctionLine.className = "correction-swap-line";
  correctionLine.style.cssText =
    "display:flex;align-items:center;min-height:1.4em;padding:0 8px;opacity:0;max-height:0;overflow:hidden;border-left:2px solid rgba(74,222,128,0.4);background:rgba(74,222,128,0.05);";
  correctionLine.innerHTML = `
    <span style="display:inline-block;width:30px;margin-right:20px;color:#555;text-align:right;font-size:0.85em;user-select:none;flex-shrink:0;">...</span>
    <span style="flex:1;color:#4ade80;font-weight:500;">${correctionText}</span>
    <span class="change-annotation annotation-fix" style="opacity:0;flex-shrink:0;margin-left:auto;">fixed</span>
  `;
  buggyLine.parentNode.insertBefore(correctionLine, buggyLine.nextSibling);

  const correctionAnnotation =
    correctionLine.querySelector(".change-annotation");

  tl.to(cursor, { opacity: 1, duration: 0 });
  tl.to(cursor, {
    opacity: 0,
    duration: 0.12,
    repeat: 5,
    yoyo: true,
  });

  tl.to(buggyLine, {
    borderLeft: "2px solid rgba(248,113,113,0.6)",
    backgroundColor: "rgba(248,113,113,0.06)",
    duration: 0.3,
  });
  tl.to(buggyLine, {
    paddingLeft: "12px",
    duration: 0.15,
  });

  if (annotation) {
    tl.to(annotation, {
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }

  tl.to(correctionLine, {
    opacity: 1,
    maxHeight: "40px",
    duration: 0.4,
    ease: "power2.out",
  });

  tl.to(correctionAnnotation, {
    opacity: 1,
    duration: 0.3,
    ease: "back.out(1.7)",
  });

  tl.to({}, { duration: 1 });

  tl.to(buggyLine, {
    opacity: 0,
    maxHeight: 0,
    duration: 0.3,
    ease: "power2.in",
  });
  tl.to(
    correctionLine,
    {
      borderLeftColor: "transparent",
      backgroundColor: "transparent",
      duration: 0.3,
    },
    "-=0.15"
  );

  tl.to([correctionAnnotation], { opacity: 0, duration: 0.2 });
  tl.call(() => {
    cursor.remove();
    correctionLine.remove();
    buggyLine.style.cssText = "";
  });
}

export default function CodeBlock() {
  const [html, setHtml] = useState("");
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const shikiTheme = theme === "light" ? "light-plus" : "dark-plus";

  useEffect(() => {
    async function highlight() {
      const highlighted = await codeToHtml(codeBefore, {
        lang: "json",
        theme: shikiTheme,
      });
      setHtml(highlighted);
    }
    highlight();
  }, [shikiTheme]);

  useGSAP(
    () => {
      if (!html) return;
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline();

      tl.to({}, { duration: 0.8 });

      runCorrection(tl, container, corrections[0].line, corrections[0].fix);

      tl.to({}, { duration: 1.2 });
    },
    { dependencies: [html], scope: containerRef }
  );

  const replay = () => {
    const container = containerRef.current;
    if (container) {
      container
        .querySelectorAll(".correction-swap-line")
        .forEach((el) => el.remove());
      container.querySelectorAll(".code-line").forEach((el) => {
        el.style.cssText = "";
      });
    }
    setHtml("");
    setTimeout(async () => {
      const highlighted = await codeToHtml(codeBefore, {
        lang: "json",
        theme: "dark-plus",
      });
      setHtml(highlighted);
    }, 50);
  };

  if (!html) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeEl = doc.querySelector("code");
  const inner = codeEl ? codeEl.innerHTML : "";
  const lines = inner.split("\n").filter((l) => l !== "");

  return (
    <div className="codeblock" ref={containerRef}>
      <pre>
        <code>
          {lines.map((lineHtml, i) => (
            <div key={i} className="code-line">
              <span
                className="line-content"
                dangerouslySetInnerHTML={{ __html: lineHtml }}
              />
              {corrections.some((c) => c.line === i) && (
                <span className="change-annotation annotation-fix">issue</span>
              )}
            </div>
          ))}
        </code>
      </pre>
      <button onClick={replay} className="replay-btn" title="Replay animation">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 4v6h6" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      </button>
    </div>
  );
}
