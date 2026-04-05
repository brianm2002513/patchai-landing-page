import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "../../context/ThemeContext";

const codeString = `const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateCampground, isAuthor, catchAsync, isValidObjectId } = require('../utils/middleware');

/* The './' tells node.js not to look in the 'node-modules' folder as it would automatically do, buy instead look in the current directory */
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage: storage });
const maxPhotos = 5;

// API endpoint for paginated campgrounds
router.get('/api/load', campgrounds.loadCampgrounds);

// Actual routes that can be called
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image', maxPhotos), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(isValidObjectId, catchAsync(campgrounds.showCampground))
    .put(isValidObjectId, isLoggedIn, isAuthor, upload.array('image', maxPhotos), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isValidObjectId, isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isValidObjectId, isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

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
