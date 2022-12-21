import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CellState } from '../../Logic/FieldStates';
import { Cell } from './Cell';

test('renders button', () => {
    const state = new CellState(0, () => {},() => {});

    render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
});

test('button has mine-hidden class', () => {
    const state = new CellState(0, () => {},() => {});

    render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('mine-hidden');
});

test('button clicked calls onClick', () => {
    const state = new CellState(0, () => {},() => {});

    let clicked = false;

    render(<Cell cellState={state} onClick={()=>{clicked = true;}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = screen.getByRole('button');

    userEvent.click(buttonElement);

    expect(clicked).toBeTruthy();
});

test('button double clicked calls onDoubleClick', () => {
    const state = new CellState(0, () => {},() => {});

    let clicked = false;

    render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{clicked = true;}} onFlag={()=>{}}/>);

    const buttonElement = screen.getByRole('button');

    userEvent.dblClick(buttonElement);

    expect(clicked).toBeTruthy();
});

test('button right clicked calls onFLag', () => {
    const state = new CellState(0, () => {},() => {});

    let clicked = false;

    render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{clicked = true;}}/>);

    const buttonElement = screen.getByRole('button');

    userEvent.click(buttonElement,{button: 2});

    expect(clicked).toBeTruthy();
});

test('blown mined cell has mine-blown class', () => {
    const state = new CellState(0, () => {},() => {});

    state.isMined = true;
    state.isBlown = true;

    render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = screen.getByRole('button');
    
    expect(buttonElement).toHaveClass('mine-blown');
});

test('blown unmined cell has mine-shown val-0 class', () => {
    const state = new CellState(0, () => {},() => {});

    state.isBlown = true;

    const {container} = render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-shown val-0');
});

test('flagged cell has mine-flagged class', () => {
    const state = new CellState(0, () => {},() => {});

    state.flag();

    const {container} = render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-flagged');
});

test('queried cell has mine-query class', () => {
    const state = new CellState(0, () => {},() => {});

    state.flag();
    state.flag();

    const {container} = render(<Cell cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-query');
});
