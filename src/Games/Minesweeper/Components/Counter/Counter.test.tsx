import { render } from '@testing-library/react';
import { Counter } from './Counter';

test('renders span', () => {   
    const {container} = render(<Counter count={123}/>);

    const spanElement = container.querySelector('span.counter');

    expect(spanElement).toBeInTheDocument();
    expect(spanElement?.textContent).toEqual('123');
});

