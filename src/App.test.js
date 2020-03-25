import React from 'react';
import App from './index';
import renderer from 'react-test-renderer';

it('renders app correctly', () => {
  const app = renderer.create(<App />).toJSON();
  expect(app).toMatchSnapshot();
});
