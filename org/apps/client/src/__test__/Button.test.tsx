import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../components/Button';

describe('<Button />', () => {
  test('renders the button', () => {
    render(
      <Button type="button" title={'Button text'} variant="btn_dark_blue" />
    );
    const homeElement = screen.getByText(/Button text/i); // Fixed getByTestId typo
    expect(homeElement).toBeInTheDocument(); // Ensuring the element is in the document
  });
});
