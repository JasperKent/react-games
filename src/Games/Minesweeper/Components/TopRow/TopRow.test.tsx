import { render } from "@testing-library/react";
import { TopRow } from "./TopRow";

test('creation', () => {   
    const {container} = render(<TopRow playing="playing" unexploded={10} />);

    const div = container.querySelector('div.top-row');

    expect(div).toBeInTheDocument();
});

test('won message', () => {   
    const {container} = render(<TopRow playing="won" unexploded={10} />);

    const message = container.querySelector('.message-text');

    expect(message?.textContent).toEqual('Congratulations! You cleared the field.');
});

test('lost message', () => {   
    const {container} = render(<TopRow playing="lost" unexploded={10} />);

    const message = container.querySelector('.message-text');

    expect(message?.textContent).toEqual('Bad luck! Try again.');
});

test('no message when playing', () => {   
    const {container} = render(<TopRow playing="playing" unexploded={10} />);

    const message = container.querySelector('.message-text');

    expect(message?.textContent).toEqual('');
});
