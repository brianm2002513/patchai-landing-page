import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock GSAP and other browser APIs that might fail in JSDOM
const gsapMock = {
  registerPlugin: vi.fn(),
  timeline: vi.fn(() => ({
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    play: vi.fn().mockReturnThis(),
    reverse: vi.fn().mockReturnThis(),
    paused: vi.fn().mockReturnThis(),
    kill: vi.fn().mockReturnThis(),
  })),
  to: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  killTweensOf: vi.fn(),
  ticker: {
    add: vi.fn(),
    lagSmoothing: vi.fn(),
  },
  context: vi.fn(() => ({
    add: vi.fn((fn) => fn()),
    revert: vi.fn(),
  })),
};

vi.mock('gsap', () => ({
  default: gsapMock,
  ...gsapMock,
}));

vi.mock('gsap/all', () => ({
  default: gsapMock,
  ...gsapMock,
  ScrollTrigger: {
    create: vi.fn(() => ({
      kill: vi.fn(),
      refresh: vi.fn(),
      update: vi.fn(),
    })),
    refresh: vi.fn(),
    update: vi.fn(),
    register: vi.fn(),
  },
  TextPlugin: {},
}));

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((fn) => fn()),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
