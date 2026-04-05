// data/agentItems.js

export const agentItems = [
    {
        id: "store",
        title: "Build a product online store using React",
        description:
            "All set! We now track focus share, switching rates, and rolling engagement...",
        time: "now",
        taskDescription:
            "I want to build an online store where I am able to add products with images, descriptions, and prices, and have customers browse the products by category and also be able to view specfic products in detail pages.",
        activities: [
            { label: "Thought", time: "5s" },
        ],
        files: [
            { id: "category", label: "category.jsx" },
            { id: "categoryProduct", label: "categoryProduct.jsx" },
            { id: "productDetail", label: "productDetail.jsx" },
        ],
        defaultFile: "category",
        timeline: [
            {
                type: "step",
                content: "First, I will design a category component allowing users to browse products by category..."
            },
            {
                type: "file",
                id: "category",
                label: "category.jsx",
                additions: "+150",
                deletions: "-0"
            },
            {
                type: "step",
                content: "Next, I will design a product card component to showcase item details, actions, and styling for the category listing."
            },
            {
                type: "file",
                id: "categoryProduct",
                label: "categoryProduct.jsx",
                additions: "+94",
                deletions: "-0"
            },
            {
                type: "step",
                content: "Finally, I will build a detailed product page that fetches and displays full item information by ID..."
            },
            {
                type: "file",
                id: "productDetail",
                label: "productDetail.jsx",
                additions: "+40",
                deletions: "-0"
            },
            {
                type: "step",
                content: "Add these to your application and you have a basic online store! From here, you can iterate on the design, add features like search and cart functionality, and optimize performance as needed..."
            },
            {
                type: "file",
                id: "app",
                label: "app.jsx",
                additions: "+90",
                deletions: "-0"
            }
        ]
    },
    {
        id: "Routes",
        title: "Generate Routes",
        description: "Create routes for campgrounds, reviews and users.",
        time: "now",
        taskDescription:
            "Can you create routes for accessing campgrounds, reviews as well as endpoints allowing users to register and login",
        activities: [
            { label: "Thought", time: "10s" },
            { label: "Searched", time: "Routes file structure" },
            { label: "Read", time: "Individual route functionalities" },
        ],
        files: [
            { id: "campgrounds", label: "campgrounds.js" },
            { id: "reviews", label: "reviews.js" },
            { id: "users", label: "users.js" }
        ],
        defaultFile: "users",
        timeline: [
            {
                type: "step",
                content: "I will generate login and register endpoints for a user."
            },
            {
                type: "file",
                id: "users",
                label: "users.js",
                additions: "+18",
                deletions: "-2"
            },
            {
                type: "step",
                content: "I will generate HTTP get calls allowing users to query campgrounds."
            },
            {
                type: "file",
                id: "campgrounds",
                label: "campgrounds.js",
                additions: "+28",
                deletions: "-6"
            },
            {
                type: "step",
                content: "Finally, I will generate get and post HTTP queries allowing users to read and also post comments on campgrounds."
            },
            {
                type: "file",
                id: "reviews",
                label: "reviews.js",
                additions: "+13",
                deletions: "-0"
            },
        ]
    },
    {
        id: "database",
        title: "Create JSON Database",
        description: "Set up a JSON database for product information, that can be easily queried and updated by an application...",
        time: "now",
        taskDescription:
            "I want to create a fake database, with the data stored in JSON file that I will be able to access via a localhost port.",
        activities: [
            { label: "Thought", time: "10s" },
        ],
        files: [
            { id: "db", label: "db.json" }
        ],
        defaultFile: "db",
        timeline: [
            {
                type: "step",
                content: "I will create a JSON file to serve as a simple database for product information. I will first add categories."
            },
            {
                type: "file",
                id: "db",
                label: "db.json",
                additions: "+0",
                deletions: "-0"
            },
            {
                type: "step",
                content: "I will then add products to the database, ensuring each product has an ID, name, description, price, and category association."
            },
            {
                type: "file",
                id: "db",
                label: "db.json",
                additions: "+150",
                deletions: "-0"
            },
            {
                type: "step",
                content: "Finally, I will add the specfications for each product, such as dimensions, weight, and materials used, and add the number of items in stock."
            },
            {
                type: "file",
                id: "db",
                label: "db.json",
                additions: "+80",
                deletions: "-0"
            },
        ]
    },
];