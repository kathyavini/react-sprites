import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

import { Map } from '../components/Map';
import { Accordion } from '../components/Accordian';

// describe('Accordion test', () => {
//   test('should show title all the time', () => {
//     render(<Accordion title="Testing">{/* <h4>Content</h4> */}</Accordion>);

//     expect(screen.getByLabelText(/accordion/i)).toBeInTheDocument();
//   });
// });

describe('Map', () => {
  test('it should be in the document', () => {
    render(<Map position={[100, 200]}></Map>);

    expect(screen.getByLabelText(/backdrop/i)).toBeInTheDocument();
  });
});
