import { render } from "@testing-library/react";
import { DefaultMinesweeperData, MinesweeperContext, MinesweeperData } from "../../contexts/MinesweeperContext";
import { TopRow } from "./TopRow";

test('creation', () => {   
    const {container} = render(<TopRow />);

    const div = container.querySelector('div.top-row');

    expect(div).toBeInTheDocument();
});

test('won message', () => {   
    const values = {...DefaultMinesweeperData, unexploded: 10};

    const {container} = render(<MinesweeperContext.Provider value={values}> <TopRow /></MinesweeperContext.Provider>);

    const message = container.querySelector('.message-text');

    expect(message?.textContent).toEqual('Congratulations! You cleared the field.');
});

test('lost message', () => {   
    const values: MinesweeperData = {...DefaultMinesweeperData, playing: 'lost'};

    const {container} = render(<MinesweeperContext.Provider value={values}> <TopRow /></MinesweeperContext.Provider>);

    const message = container.querySelector('.message-text');

    expect(message?.textContent).toEqual('Bad luck! Try again.');
});

test('no message when playing', () => { 
    const values: MinesweeperData = {...DefaultMinesweeperData, playing: 'playing'};
    
    const {container} = render(<MinesweeperContext.Provider value={values}> <TopRow /></MinesweeperContext.Provider>);

    const message = container.querySelector('.message-text');

    expect(message?.textContent).toEqual('');
});
