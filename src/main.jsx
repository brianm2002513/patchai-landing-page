import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Changelog from './pages/Changelog.jsx';
import NotFound from './pages/NotFound.jsx';
import NavFooterLayout from './components/layout/NavFooterLayout.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  gestureOrientation: 'vertical',
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

// Unified layout refresh function for Lenis and ScrollTrigger
const refreshLayout = () => {
  lenis.resize();
  ScrollTrigger.refresh();
};

// Global Rename for external access
window.refreshLayout = refreshLayout;

// Global ResizeObserver with debounce to catch all layout changes
let resizeTimeout;
const resizeObserver = new ResizeObserver(() => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(refreshLayout, 100);
});
resizeObserver.observe(document.body);

// Update Lenis on every frame
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<NavFooterLayout />}>
          <Route index element={<App />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
)
