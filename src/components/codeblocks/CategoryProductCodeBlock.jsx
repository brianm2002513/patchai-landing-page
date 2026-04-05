import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "../../context/ThemeContext";

const codeString = `import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContext';

const CategoryProduct = ({
    id,
    title,
    image,
    specs,
    features,
    price,
    stock
}) => {
    const navigate = useNavigate();
    const { addProduct } = useContext(CartContext);

    return (
        <>
            <ProductTitle>
                <Link to={\`/products/\${id}\`}><h1>{title}</h1></Link>
            </ProductTitle>
            <article>
                <figure>
                    <div className='category-product-image-container'>
                        <ProductImage src={\`/assets/\${image}\`} alt={title} />
                    </div>
                </figure>

                <aside>
                    <div className='category-product-info-dimensions'>
                        <h3>Dimensions</h3>
                        <label>{specs.dimensions}</label>
                    </div>

                    {
                        specs.capacity &&
                        <div className='category-product-info-capacity'>
                            <h3>Capacity</h3>
                            <label>{specs.capacity}</label>
                        </div>
                    }

                    <div className='category-product-info-features'>
                        <h3>Features</h3>
                        <ul>
                            {features?.map((f, i) => {
                                return <li key={\`features\${i}\`}>{f}</li>
                            })}
                        </ul>
                    </div>
                </aside>

                <aside className='category-product-finance'>
                    <div className='category-product-finance-price'>
                        £{price}
                    </div>

                    <div className='category-product-info-stock'>
                        <label>Stock level: {stock}</label><br />
                        <label>FREE Delivery</label>
                    </div>

                    <div className='category-product-action'>
                        <button onClick={() => navigate(\`/products/\${id}\`)}>View Product</button><br />
                        <button className='add-to-basket' onClick={() => addProduct({ id, title, price })}>
                            Add to Basket
                        </button>
                    </div>
                </aside>
            </article>
        </>
    )
}

export default CategoryProduct;

const ProductTitle = styled.div\`
    color: darkslategray;
    margin-bottom: 10px;
\`;

const ProductImage = styled.img\`
    width: 300px;
    height: 266px;
\`;
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
