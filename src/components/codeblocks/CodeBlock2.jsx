import { useEffect, useState, useRef } from "react";
import { codeToHtml } from "shiki";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../../context/ThemeContext";

const codeBefore = `function fetchUserData(userId) {
  let user;

  fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`)
    .then(res => res.json())
    .then(data => {
      user = data;
    })
    .catch(err => {
      console.log("Error:", err);
    });

  return user;
}

function getUserName(userId) {
  const user = fetchUserData(userId);

  if (!user) {
    console.log("No user found");
  }

  return user.name.toUpperCase();
}

const name = getUserName(1);
console.log(name);

setTimeout(() => {
  console.log("Final user:", user);
}, 1000);`;

const codeAfter = `async function fetchUserData(userId) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
    const data = await res.json();
    return data; // ✅ now returns actual data
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

async function getUserName(userId) {
  const user = await fetchUserData(userId);

  if (!user) {
    console.log("No user found");
    return null;
  }

  return user.name.toUpperCase(); // ✅ safe
}

(async function main() {
  const name = await getUserName(1);

  if (name) {
    console.log(name);
  }

  const user = await fetchUserData(1);
  console.log("Final user:", user); // ✅ correct scope
})();`;

const errorRanges = [
  { start: 0, end: 12, label: "async/sync mismatch" },
  { start: 22, end: 25, label: "scope error" },
];

export default function CodeBlock2({ onComplete }) {
  const [htmlBefore, setHtmlBefore] = useState("");
  const [htmlAfter, setHtmlAfter] = useState("");
  const containerRef = useRef(null);

  const { theme } = useTheme();
  const shikiTheme = theme === "light" ? "light-plus" : "dark-plus";

  useEffect(() => {
    async function highlight() {
      const [before, after] = await Promise.all([
        codeToHtml(codeBefore, { lang: "js", theme: shikiTheme }),
        codeToHtml(codeAfter, { lang: "js", theme: shikiTheme }),
      ]);
      setHtmlBefore(before);
      setHtmlAfter(after);
    }
    highlight();
  }, [shikiTheme]);

  useGSAP(
    () => {
      if (!htmlBefore || !htmlAfter) return;
      const container = containerRef.current;
      if (!container) return;

      const allLines = Array.from(
        container.querySelectorAll(".buggy-section .code-line")
      );
      if (allLines.length < 26) return;

      const overlays = [];
      const badges = [];

      errorRanges.forEach(({ start, end, label }) => {
        const group = document.createElement("div");
        group.className = "correction-group";
        group.style.cssText =
          "position:absolute;left:0;right:0;" +
          "background:rgba(248,113,113,0.08);" +
          "border-left:3px solid rgba(248,113,113,0.5);" +
          "opacity:0;pointer-events:none;z-index:2;";

        const startLine = allLines[start];
        const endLine = allLines[end];
        if (!startLine || !endLine) return;

        const containerRect = container.getBoundingClientRect();
        const startRect = startLine.getBoundingClientRect();
        const endRect = endLine.getBoundingClientRect();

        group.style.top = startRect.top - containerRect.top + "px";
        group.style.height =
          endRect.bottom - startRect.top + "px";
        container.appendChild(group);
        overlays.push(group);

        const badge = document.createElement("div");
        badge.style.cssText =
          "position:absolute;right:16px;top:" +
          (startRect.top - containerRect.top + 4) +
          "px;" +
          "background:rgba(248,113,113,0.15);" +
          "color:#f87171;border:1px solid rgba(248,113,113,0.25);" +
          "padding:1px 8px;border-radius:10px;font-size:10px;" +
          "font-weight:600;opacity:0;z-index:10;pointer-events:none;" +
          "font-family:'Space Grotesk',system-ui,sans-serif;" +
          "letter-spacing:0.03em;";
        badge.textContent = label;
        container.appendChild(badge);
        badges.push(badge);
      });

      const correctedBlock = container.querySelector(".corrected-section");
      if (correctedBlock) correctedBlock.style.opacity = "0";

      const successBadge = container.querySelector(".success-badge");
      if (successBadge) successBadge.style.opacity = "0";

      const tl = gsap.timeline();

      // Phase 1: Identify errors — highlight all buggy ranges
      tl.to(overlays, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.25,
      });

      tl.to(
        badges,
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // // Hold so user reads all the issues
      tl.to({}, { duration: 2 });

      // // Phase 2: Transition — pulse overlays then crossfade
      tl.to(overlays, {
        backgroundColor: "rgba(248,113,113,0.14)",
        duration: 0.3,
      });
      tl.to(overlays, {
        backgroundColor: "rgba(248,113,113,0.06)",
        duration: 0.3,
      });

      // Fade out buggy block + its overlays
      tl.to(".buggy-section", { opacity: 0, duration: 0.5 });
      tl.to(
        [overlays, badges],
        { opacity: 0, duration: 0.3 },
        "-=0.3"
      );

      // // Phase 3: Reveal corrected block
      tl.to(correctedBlock, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      tl.to(successBadge, {
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      // // Hold so user sees the fix
      tl.to({}, { duration: 2 });

      // // Phase 4: Clean up — fade to normal
      tl.to(successBadge, { opacity: 0, duration: 0.3 });
      tl.to(
        correctedBlock,
        {
          borderLeftColor: "transparent",
          backgroundColor: "transparent",
          duration: 0.4,
        },
        "-=0.1"
      );

      tl.call(() => onComplete?.());

      return () => {
        overlays.forEach((o) => o.remove());
        badges.forEach((b) => b.remove());
      };
    },
    { dependencies: [htmlBefore, htmlAfter], scope: containerRef }
  );

  const replay = () => {
    const container = containerRef.current;
    if (container) {
      container
        .querySelectorAll(".correction-group")
        .forEach((el) => el.remove());
      container
        .querySelectorAll(".codeblock > div[style]")
        .forEach((el) => {
          if (
            el.style.position === "absolute" &&
            el.textContent.length < 30
          )
            el.remove();
        });
    }
    setHtmlBefore("");
    setHtmlAfter("");
    setTimeout(async () => {
      const [before, after] = await Promise.all([
        codeToHtml(codeBefore, { lang: "js", theme: shikiTheme }),
        codeToHtml(codeAfter, { lang: "js", theme: shikiTheme }),
      ]);
      setHtmlBefore(before);
      setHtmlAfter(after);
    }, 50);
  };

  if (!htmlBefore || !htmlAfter) return null;

  const parse = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const codeEl = doc.querySelector("code");
    return codeEl
      ? codeEl.innerHTML.split("\n").filter((l) => l !== "")
      : [];
  };

  const linesBefore = parse(htmlBefore);
  const linesAfter = parse(htmlAfter);

  return (
    <div className="codeblock" ref={containerRef}>
      <div style={{ position: "relative" }}>
        <div className="buggy-section">
          <pre>
            <code>
              {linesBefore.map((lineHtml, i) => (
                <div key={i} className="code-line">
                  <span
                    className="line-content"
                    dangerouslySetInnerHTML={{ __html: lineHtml }}
                  />
                </div>
              ))}
            </code>
          </pre>
        </div>

        <div
          className="corrected-section"
          style={{
            position: "absolute",
            inset: 0,
            borderLeft: "3px solid rgba(74,222,128,0.4)",
            background: theme === "light" ? "rgba(74,222,128,0.1)" : "rgba(74,222,128,0.03)",
          }}
        >
          <pre>
            <code>
              {linesAfter.map((lineHtml, i) => (
                <div key={i} className="code-line">
                  <span
                    className="line-content"
                    dangerouslySetInnerHTML={{ __html: lineHtml }}
                  />
                </div>
              ))}
            </code>
          </pre>
          <div
            className="success-badge"
            style={{
              position: "absolute",
              top: 8,
              right: 16,
              background: "rgba(74,222,128,0.15)",
              color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.25)",
              padding: "1px 8px",
              borderRadius: 10,
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              letterSpacing: "0.03em",
              zIndex: 10,
            }}
          >
            corrected
          </div>
        </div>
      </div>

      <button onClick={replay} className="replay-btn" title="Replay animation">
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
}
