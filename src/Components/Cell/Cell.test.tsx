import { render } from '@testing-library/react';
import { CellState } from '../../Logic/FieldStates';
import { Cell } from './Cell';

test('renders button', () => {
    const state = new CellState(() => {},() => {});

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    expect(buttonElement).toBeInTheDocument();
});

test('button has mine-hidden class', () => {
    const state = new CellState(() => {},() => {});

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');

    expect(buttonElement).toHaveClass('mine-hidden');
});

test('button clicked calls onClick', () => {
    const state = new CellState(() => {},() => {});

    let clicked = false;

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{clicked = true;}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');

    buttonElement?.click();

    expect(clicked).toBeTruthy();
});

test('button double clicked calls onDoubleClick', () => {
    const state = new CellState(() => {},() => {});

    let clicked = false;

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{clicked = true;}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');

    buttonElement?.dispatchEvent(new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      }));

    expect(clicked).toBeTruthy();
});

test('button right clicked calls onFLag', () => {
    const state = new CellState(() => {},() => {});

    let clicked = false;

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{clicked = true;}}/>);

    const buttonElement = container.querySelector('button');

    buttonElement?.dispatchEvent(new MouseEvent('contextmenu', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      }));

    expect(clicked).toBeTruthy();
});

test('blown mined cell has mine-blown class', () => {
    const state = new CellState(() => {},() => {});

    state.isMined = true;
    state.isBlown = true;

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-blown');
});

test('blown unmined cell has mine-shown val-0 class', () => {
    const state = new CellState(() => {},() => {});

    state.isBlown = true;

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-shown val-0');
});

test('flagged cell has mine-flagged class', () => {
    const state = new CellState(() => {},() => {});

    state.flagged = 'flag';

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-flagged');
});

test('flagged cell has mine-query class', () => {
    const state = new CellState(() => {},() => {});

    state.flagged = 'query';

    const {container} = render(<Cell data-testid="test" cellState={state} onClick={()=>{}} onDoubleClick={()=>{}} onFlag={()=>{}}/>);

    const buttonElement = container.querySelector('button');
    
    expect(buttonElement).toHaveClass('mine-query');
});

