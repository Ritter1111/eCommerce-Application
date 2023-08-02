import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../src/components/App';

test('renders the sum correctly', () => {
  const { getByText } = render(<App num1={5} num2={10} />);

  expect(getByText('Sum of 5 and 10 is 15')).toBeInTheDocument();
});