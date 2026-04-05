import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "../../context/ThemeContext";

const codeString = `const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { catchAsync, storeReturnTo } = require('../utils/middleware');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.regsiterUser));

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.Login);

router.get('/logout', users.Logout);

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
