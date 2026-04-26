import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Navbar from '../components/layout/Navbar';
import { ThemeProvider } from '../context/ThemeContext';

// Mock ThemeToggle to avoid complex DOM issues in this test
vi.mock('../ThemeToggle', () => ({
    default: () => <div data-testid="theme-toggle">Theme Toggle</div>
}));

describe('Navbar', () => {
    const renderNavbar = () => {
        return render(
            <ThemeProvider>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </ThemeProvider>
        );
    };

    it('renders the logo and brand name', () => {
        renderNavbar();
        expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();
    });

    it('renders main navigation links', () => {
        renderNavbar();
        expect(screen.getByTestId('product-link')).toBeInTheDocument();
        expect(screen.getByTestId('pricing-link')).toBeInTheDocument();
        // expect(screen.getByTestId('use-cases-link')).toBeInTheDocument();
        expect(screen.getByTestId('resources-link')).toBeInTheDocument();
        //expect(screen.getByTestId('signin-button')).toBeInTheDocument();
    });

    it('handles mobile menu toggle', () => {
        renderNavbar();
        const menuButton = screen.getByLabelText(/open menu/i);
        fireEvent.click(menuButton);

        // Mobile sidebar should be visible or at least buttons inside it
        // We look for the "Sign in" button in the mobile menu
        const mobileSignIn = screen.getAllByText(/Sign in/i)[1]; // Usually the second one is mobile
        expect(mobileSignIn).toBeInTheDocument();
    });
});
