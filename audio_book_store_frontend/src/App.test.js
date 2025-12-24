import { render, screen } from '@testing-library/react';
import App from './App';

test('renders browse heading', () => {
  render(<App />);
  const heading = screen.getByText(/Browse Audiobooks/i);
  expect(heading).toBeInTheDocument();
});
