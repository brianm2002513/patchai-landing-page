# PatchAI | Ship Cleaner Code. Automatically.

[![CI/CD Pipeline](https://github.com/brianm2002513/aisaas-landingpage/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/brianm2002513/aisaas-landingpage/actions/workflows/ci-cd.yml)

PatchAI is a high-performance landing page for a next-generation AI coding assistant. Built with **React 19**, **Tailwind 4**, and **GSAP**, it demonstrates a commitment to cinematic user experiences combined with rigorous engineering standards.

## 🚀 Engineering Highlights

- **FOUC Prevention**: Implemented a blocking critical-path script in `index.html` to prevent Flash of Unstyled Content, ensuring theme synchronization (Dark/Light/System) before the first paint.
- **GSAP Context Management**: Utilizes `@gsap/react` for memory-safe animation cleanup and high-performance scroll-driven interactions.
- **Advanced State & Routing**: Leverages **React Router 7** for seamless navigation and **Context API** for global theme and state management.

## 🧪 Testing Suite (Vitest)

This project features a robust unit testing suite designed for animation-heavy applications.

- **Mocked GSAP Engine**: A custom `setupTests.js` implementation that mocks the entire GSAP and ScrollTrigger API, allowing component tests to run in headless environments (JSDOM) without crashing.
- **Component Integrity**: Unit tests for critical components like the `WaitlistForm` (validation/persistence) and `Navbar` (navigation/responsiveness).
- **Test Command**: 
  ```bash
  npm test
  ```

## 🔄 CI/CD Pipeline

Every push and pull request is automatically validated through a multi-stage pipeline:

| Stage | Tool | Purpose |
|-------|------|---------|
| **Lint** | ESLint 9 | Enforces code style and catches anti-patterns |
| **Test** | Vitest + RTL | Validates component logic and user interactions |
| **Build** | Vite 7 | Produces optimized production bundle |

> Quality gates block merges if any stage fails — no broken code reaches `main`.

## 🛠 Tech Stack

- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Animations**: GSAP (GreenSock) + @gsap/react
- **3D Elements**: Three.js + React Three Fiber
- **Testing**: Vitest + React Testing Library + JSDOM
- **CI/CD**: GitHub Actions

---

## 📦 Installation & Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Run the test suite: `npm test`
