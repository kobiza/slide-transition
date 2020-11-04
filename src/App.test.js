import React from 'react';
import { render } from '@testing-library/react';
import AppGsap from './App';

test('renders learn react link', () => {
  const { getByText } = render(<AppGsap />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
