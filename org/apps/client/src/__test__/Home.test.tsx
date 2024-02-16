import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Home from '../components/Home';

describe('<Home />', () => {
  test('renders the home', () => {
    render(<Home />);
    const homeElement = screen.getByText(/home/i); // Fixed getByTestId typo
    expect(homeElement).toBeInTheDocument(); // Ensuring the element is in the document
  });
});
