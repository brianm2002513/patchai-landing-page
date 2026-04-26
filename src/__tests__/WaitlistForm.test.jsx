import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WaitlistForm from '../components/WaitlistForm';

describe('WaitlistForm', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('renders the email input and submit button', () => {
        render(<WaitlistForm />);
        expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        render(<WaitlistForm />);
        const input = screen.getByPlaceholderText(/email address/i);
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(input.value).toBe('test@example.com');
    });

    it('shows success message after valid submission', async () => {
        render(<WaitlistForm />);
        const input = screen.getByPlaceholderText(/email address/i);
        const button = screen.getByRole('button', { name: /join waitlist/i });

        fireEvent.change(input, { target: { value: 'test@example.com' } });
        fireEvent.click(button);

        // Should show loading state (mocked setTimeout)
        expect(button).toBeDisabled();

        // Wait for success message
        await waitFor(() => {
            expect(screen.getByText(/you are on the list/i)).toBeInTheDocument();
        }, { timeout: 2000 });

        // Verify localStorage
        const waitlist = JSON.parse(localStorage.getItem('patchai_waitlist'));
        expect(waitlist).toContainEqual(expect.objectContaining({ email: 'test@example.com' }));
    });

    it('does not allow submission with empty email', () => {
        render(<WaitlistForm />);
        const button = screen.getByRole('button', { name: /join waitlist/i });
        expect(button).toBeDisabled();
    });
});
