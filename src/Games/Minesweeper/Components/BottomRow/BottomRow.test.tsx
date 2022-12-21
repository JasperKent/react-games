import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomRow } from "./BottomRow";

test('creation', () => {   
    const {container} = render(<BottomRow percent={10} height={4} width={3} onReset={(w,h,c)=>{}} />);

    const div = container.querySelector('div.bottom-row');

    expect(div).toBeInTheDocument();
});

test('cover percent gives cover count', () => {   
    render(<BottomRow percent={10} height={40} width={30} onReset={(w,h,c)=>{}} />);

    const countInput = screen.getByDisplayValue(120);

    expect(countInput).toBeInTheDocument();
});

test('onReset called with correct values', () => {   
    let width = 0;
    let height = 0;
    let count = 0;

    render(<BottomRow percent={10} height={40} width={30} onReset={(w,h,c)=>{width = w; height = h; count = c }} />);

    const reset = screen.getByText('Reset');

    userEvent.click(reset);

    expect(width).toEqual(30);
    expect(height).toEqual(40);
    expect(count).toEqual(120);
});