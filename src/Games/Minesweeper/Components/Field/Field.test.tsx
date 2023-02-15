import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultMinesweeperData, MinesweeperContext, MinesweeperData } from '../../contexts/MinesweeperContext';
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

    const values: MinesweeperData = {...DefaultMinesweeperData, cells, playing: 'playing'};

    const {container} = render(<MinesweeperContext.Provider value={values}><Field  /></MinesweeperContext.Provider>);

    const buttons = container.querySelectorAll('div.field button');

    expect(buttons.length).toBe(50);
});

test('cell click causes refresh', () => {   
    let clicked = false;

    const cells = generateCells(5, 10);

    const values: MinesweeperData = {...DefaultMinesweeperData, cells, playing: 'playing', refresh: () => clicked = true};

    render(<MinesweeperContext.Provider value={values}><Field  /></MinesweeperContext.Provider>);
    
    const buttonElement = screen.getAllByRole('button');

    userEvent.click(buttonElement[0]);

    expect(clicked).toBeTruthy();
});
