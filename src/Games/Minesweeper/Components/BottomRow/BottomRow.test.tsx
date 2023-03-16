import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DefaultMinesweeperData, MinesweeperContext, MinesweeperData } from "../../contexts/MinesweeperContext";
import { BottomRow } from "./BottomRow";

test('creation', () => {   
    const {container} = render(<BottomRow initPercent={10} initHeight={4} initWidth={3} />);

    const div = container.querySelector('div.bottom-row');

    expect(div).toBeInTheDocument();
});

test('cover percent gives cover count', () => {   
    render(<BottomRow initPercent={10} initHeight={40} initWidth={30} />);

    const countInput = screen.getByDisplayValue(120);

    expect(countInput).toBeInTheDocument();
});

test('onReset called with correct values', () => {   
    let width = 0;
    let height = 0;
    let count = 0;

    const values: MinesweeperData = {...DefaultMinesweeperData, reset: (w,h,c) => {width = w; height = h; count = c;} };

    render(<MinesweeperContext.Provider value={values}><BottomRow initPercent={10} initHeight={40} initWidth={30} /></MinesweeperContext.Provider>);

    const reset = screen.getByText('Reset');

    userEvent.click(reset);

    expect(width).toEqual(30);
    expect(height).toEqual(40);
    expect(count).toEqual(120);
});