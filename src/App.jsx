import { useState } from 'react'
import './App.css'
import bgImage from './assets/images/francis_cropsey_painting_oil_on_canvas.jpg'
import teamImage from './assets/images/team_collaboration.png'
import DemoStage from './components/demoUI/DemoStage';
import HeadlineCTA from './components/HeadlineCTA';
import Customers from './components/Customers';
import StatisticsSection from './components/StatisticsSection';
import CodeEditor from './components/demoUI/CodeEditor';
import RouteGenerator from './components/demoUI/RouteGenerator';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ChangelogSection from './components/ChangelogSection';
import CTASection from './components/CTASection';
import GrowthSection from './components/GrowthSection';

function App() {

  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-16 pt-[10vh] pb-16">
      <HeadlineCTA />
      <DemoStage bgImage={bgImage} />
      <Customers />
      <div className="mx-5 py-12 md:py-16 rounded-lg" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="px-5 flex flex-col md:flex-row gap-8 lg:gap-14">
          <div className="relative w-full max-w-[770px] md:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-500px)] h-[600px] rounded-lg z-0 overflow-hidden">
            <img
              src={bgImage}
              alt="Artistic code background"
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Dark mode overlay */}
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ backgroundColor: 'var(--overlay-image)' }} />
            <div className="absolute left-14 xl:left-1/2 xl:-translate-x-1/2 top-1/2 -translate-y-1/2 w-[560px] h-[550px] rounded-lg overflow-hidden shadow-2xl">
              <CodeEditor />
            </div>
          </div>
          <div className="hidden md:flex flex-1 flex-col justify-center text-left">
            <h2 className="space-grotesk-bold text-4xl lg:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              Code that fixes itself
            </h2>
            <p className="space-grotesk-normal text-lg lg:text-4xl mt-4" style={{ color: 'var(--text-accent)' }}>
              PatchAI finds bugs, corrects logic, and rewrites broken code — across entire files, not just single lines.
            </p>
          </div>
        </div>
      </div>
      <StatisticsSection />
      <div className="mx-5 py-12 md:py-16 rounded-lg" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="px-5 flex flex-col md:flex-row gap-8 lg:gap-14">
          <div className="hidden md:flex flex-1 flex-col justify-center text-left">
            <h2 className="space-grotesk-bold text-4xl lg:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
              From prompt to production
            </h2>
            <p className="space-grotesk-normal text-lg lg:text-4xl mt-4" style={{ color: 'var(--text-accent)' }}>
              PatchAI transforms your natural language prompts into high-quality, production-ready code — handling the complex implementation details so you can stay in flow.
            </p>
          </div>
          <div className="relative w-full max-w-[770px] md:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-500px)] h-[600px] rounded-lg z-0 overflow-hidden">
            <img
              src={bgImage}
              alt="Automation background"
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Dark mode overlay */}
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ backgroundColor: 'var(--overlay-image)' }} />
            <div className="absolute left-14 top-1/2 -translate-y-1/2 w-[1040px] h-[550px] rounded-lg overflow-hidden shadow-2xl">
              <RouteGenerator />
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
      <GrowthSection />
      <div className="mx-5 py-12 md:py-16 rounded-lg" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="px-5 flex flex-col-reverse md:flex-row gap-8 lg:gap-14">
          <div className="relative w-full max-w-[770px] md:max-w-[calc(100%-300px)] lg:max-w-[calc(100%-500px)] h-[350px] md:h-[600px] rounded-lg z-0 overflow-hidden">
            <img
              src={teamImage}
              alt="Our Culture"
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Dark mode overlay */}
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ backgroundColor: 'var(--overlay-image)' }} />
          </div>
          <div className="flex flex-1 flex-col justify-center text-left">
            <p className="space-grotesk-normal text-5xl lg:text-5xl font-medium mt-4" style={{ color: 'var(--text-accent)' }}>
              Our mission is to augment human creativity, not replace it. Join our community.
            </p>
            <div className="mt-8 text-sm opacity-40 font-mono" style={{ color: 'var(--text-muted)' }}>
              // Built with PatchAI v1.2.4 — 2026
            </div>
          </div>
        </div>
      </div>
      <ChangelogSection />
      <FAQ />
      <CTASection />
    </div>
  )
}

export default App
