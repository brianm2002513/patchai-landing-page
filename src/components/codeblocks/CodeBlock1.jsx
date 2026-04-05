import { useEffect, useState, useRef } from "react";
import { codeToHtml } from "shiki";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../../context/ThemeContext";

const codeBefore = `import React, { useState, useEffect } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = false;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = res.json();
    setUsers(data);
    setLoading(false);
  }

  function handleSelect(user) {
    const selected = users.find(u => { u.id === user.id; });
    console.log("Selected:", selected.name);
  }

  return (
    <div>
      <h1>Users</h1>

      {loading && <p>Loading...</p>}

      {users.map(user => (
        <div key={user.id} onClick={handleSelect(user)}>
          <p>{user.name}</p>
        </div>
      ))}

      {users.length === 0 && !loading && <p>No users found</p>}
    </div>
  );
}

export default UsersList;`;

const corrections = [
  { line: 14, fix: '    const data = await res.json(); // ❌ missing await' },
  { line: 20, fix: '    const selected = users.find(u => u.id === user.id); // ❌ no return' },
  { line: 31, fix: '        <div key={user.id} onClick={() => handleSelect(user)}> // ❌ fixed ()' },
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

  // Save original HTML, set up correction text element
  const originalHTML = lineContent.innerHTML;
  const correctionEl = document.createElement("span");
  correctionEl.style.cssText =
    "color:#4ade80;font-weight:500;opacity:0;display:none;";
  correctionEl.textContent = correctionText;
  lineContent.appendChild(correctionEl);

  // Cursor blink on buggy line
  // tl.to(cursor, { opacity: 1, duration: 0 });
  // tl.to(cursor, {
  //   opacity: 0,
  //   duration: 0.12,
  //   repeat: 5,
  //   yoyo: true,
  // });

  // Red highlight on buggy line
  tl.to(buggyLine, {
    // borderLeft: "2px solid rgba(248,113,113,0.6)",
    backgroundColor: "rgba(248,113,113,0.06)",
    duration: 0.3,
  });
  tl.to(buggyLine, { paddingLeft: "18px", duration: 0.15 });

  // // Show "issue" annotation
  // if (annotation) {
  //   tl.to(annotation, {
  //     opacity: 1,
  //     duration: 0.3,
  //     ease: "back.out(1.7)",
  //   });
  // }

  // Hold so user can read the bug
  tl.to({}, { duration: 1.5 });

  // Hide buggy text, show correction in its place (green)
  tl.call(() => {
    lineContent.style.opacity = "0";
  });
  tl.call(() => {
    correctionEl.style.display = "";
    lineContent.style.opacity = "1";
    lineContent.querySelectorAll("span:not(.change-annotation)").forEach((s) => {
      if (s !== correctionEl) s.style.display = "none";
    });
  });
  tl.fromTo(
    correctionEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "power2.out" }
  );

  // Change border to green — fix applied
  tl.to(buggyLine, {
    borderRight: "2px solid rgba(74,222,128,0.5)",
    backgroundColor: "rgba(74,222,128,0.05)",
    duration: 0.05,
  }, "<=");

  // // Hold so user can see the fix
  tl.to({}, { duration: 1.2 });

  // // Fade correction text to normal color, remove decorations
  tl.to(correctionEl, {
    color: "var(--text-primary)",
    fontWeight: 400,
    duration: 0.4,
  });
  // if (annotation) {
  //   tl.to(annotation, { opacity: 0, duration: 0.2 });
  // }
  tl.to(buggyLine, {
    borderRight: "2px solid transparent",
    backgroundColor: "transparent",
    // paddingLeft: "8px",
    duration: 0.1,
  });
  // tl.call(() => {
  //   cursor.remove();
  // });
}

export default function CodeBlock1({ onComplete }) {
  const { theme } = useTheme();
  const shikiTheme = theme === "light" ? "light-plus" : "dark-plus";
  const [html, setHtml] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    async function highlight() {
      const highlighted = await codeToHtml(codeBefore, {
        lang: "jsx",
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

      tl.to({}, { duration: 0.5 });

      runCorrection(tl, container, corrections[1].line, corrections[1].fix);

      tl.to({}, { duration: 0.5 });

      runCorrection(tl, container, corrections[2].line, corrections[2].fix);

      tl.to({}, { duration: 1.2 });

      tl.call(() => onComplete?.());
    },
    { dependencies: [html], scope: containerRef }
  );

  const replay = () => {
    setHtml("");
    setTimeout(async () => {
      const highlighted = await codeToHtml(codeBefore, {
        lang: "jsx",
        theme: shikiTheme,
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
        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
}
