import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getAllByText(/Minesweeper/i);
  expect(titleElement[0]).toBeInTheDocument();
});
