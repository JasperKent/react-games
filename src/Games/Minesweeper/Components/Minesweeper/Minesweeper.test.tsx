import { render } from "@testing-library/react";
import { Minesweeper } from "./Minesweeper";

test('renders top row', () => {   
    const {container} = render(<Minesweeper />);

    const topRowElement = container.querySelector('div.top-row');

    expect(topRowElement).toBeInTheDocument();
});

xtest('renders bottom row', () => {   
    const {container} = render(<Minesweeper />);

    const bottomRowElement = container.querySelector('div.bottom-row');

    expect(bottomRowElement).toBeInTheDocument();
});

xtest('renders cell section', () => {   
    const {container} = render(<Minesweeper />);

    const cellsElement = container.querySelector('div.field');

    expect(cellsElement).toBeInTheDocument();
});