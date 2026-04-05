import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "../../context/ThemeContext";

const codeString = `const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, catchAsync, validateReview, isReviewAuthor } = require('../utils/middleware');
// The './' tells node.js not to look in the 'node-modules' folder as it would automatically do, but instead look in the current directory
const reviews = require('../controllers/reviews');

router.route('/')
    .get(reviews.renderReviewForm)
    .post(isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
`;

export default function CodeBlock() {
    const [html, setHtml] = useState("");
    const { theme } = useTheme();
    const shikiTheme = theme === "light" ? "light-plus" : "dark-plus";

    useEffect(() => {
        async function highlight() {
            const highlighted = await codeToHtml(codeString, {
                lang: "jsx",
                theme: shikiTheme
            });

            setHtml(highlighted);
        }

        highlight();
    }, [shikiTheme]);

    if (!html) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const codeEl = doc.querySelector("code");
    const inner = codeEl ? codeEl.innerHTML : "";
    const lines = inner.split("\n").filter((l) => l !== "");

    return (
        <div className="codeblock">
            <pre>
                <code>
                    {lines.map((lineHtml, i) => (
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

    );
}
