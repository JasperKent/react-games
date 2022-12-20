import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from './Field';

test('renders top row', () => {   
    const {container} = render(<Field />);

    const topRowElement = container.querySelector('div.top-row');

    expect(topRowElement).toBeInTheDocument();
});

test('renders bottom row', () => {   
    const {container} = render(<Field />);

    const bottomRowElement = container.querySelector('div.bottom-row');

    expect(bottomRowElement).toBeInTheDocument();
});

test('renders cell section', () => {   
    const {container} = render(<Field />);

    const cellsElement = container.querySelector('div.field');

    expect(cellsElement).toBeInTheDocument();
});

test('renders 800 cells by default', () => {   
    const {container} = render(<Field />);

    const buttons = container.querySelectorAll('div.field button');

    expect(buttons.length).toBe(800);
});

test('renders 50 cells when 5 x 10', async () => {   
    const {container} = render(<Field />);

    const widthInput = screen.getByDisplayValue(40);
    const heightInput = screen.getByDisplayValue(20);
    const reset = screen.getByText('Reset');

    userEvent.clear(widthInput);
    userEvent.clear(heightInput);
    userEvent.type(widthInput,'5');
    userEvent.type(heightInput,'10');

    userEvent.click(reset);
   
    const buttons = container.querySelectorAll('div.field button');

    expect(buttons.length).toBe(50);
});