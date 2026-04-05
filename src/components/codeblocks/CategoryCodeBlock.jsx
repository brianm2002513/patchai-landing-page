import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "../../context/ThemeContext";

const codeString = `import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../fetcher'
import CategoryProduct from './categoryProduct'

const Category = () => {
  const [products, setProducts] = useState({ errorMessage: '', data: [] })
  const { categoryId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProducts(categoryId)
      setProducts(responseObject)
    }
    fetchData()
  }, [categoryId])

  return <div>Hello</div>
}

export default Category
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
