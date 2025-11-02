import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders OAuth buttons', () => {
  render(<LoginPage />);
  expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  expect(screen.getByText(/Login with GitHub/i)).toBeInTheDocument();
  expect(screen.getByText(/Login with Facebook/i)).toBeInTheDocument();
});


