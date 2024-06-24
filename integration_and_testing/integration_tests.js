import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatComponent from './ChatComponent';

test('renders chat component', () => {
    render(<ChatComponent gameId="1" />);
    const inputElement = screen.getByPlaceholderText(/Type a message/i);
    expect(inputElement).toBeInTheDocument();
});

test('sends a message', () => {
    render(<ChatComponent gameId="1" />);
    const inputElement = screen.getByPlaceholderText(/Type a message/i);
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    const buttonElement = screen.getByText(/Send/i);
    fireEvent.click(buttonElement);
    const messageElement = screen.getByText(/Hello/i);
    expect(messageElement).toBeInTheDocument();
});

