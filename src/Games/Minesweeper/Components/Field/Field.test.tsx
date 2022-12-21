import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CellState } from '../../Logic/CellState';
import { Field } from './Field';

function generateCells (width: number, height: number): CellState[][]
{
    const cells: CellState[][] = [];

    for (let row = 0; row < height; ++row) {
        cells.push([]);

        for (let col = 0; col < width; ++col) {
            cells[row].push(new CellState(row * width + col, () => {}, () => {}));
        }
    }

    return cells;
}

test('renders 50 cells when 5 x 10', () => {   
    const cells = generateCells(5, 10);

    const {container} = render(<Field cells={cells} playing="playing" refresh={() => {}}  />);

    const buttons = container.querySelectorAll('div.field button');

    expect(buttons.length).toBe(50);
});

test('cell click causes refresh', () => {   
    let clicked = false;

    const cells = generateCells(5, 10);

    render(<Field cells={cells} playing="playing" refresh={() => clicked = true }  />);
    
    const buttonElement = screen.getAllByRole('button');

    userEvent.click(buttonElement[0]);

    expect(clicked).toBeTruthy();
});
