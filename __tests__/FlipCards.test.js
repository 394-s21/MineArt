import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Card from '../src/components/FlipCards/Card';
import {
  leftPrompt,
  leftExplanation,
  leftAction,
  leftSource
} from '../src/utils/mock';

// Describing a test suite
describe('<Card />', () => {
  // Describing our test
  it('Should render text correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Card
        question={leftPrompt}
        explanation={leftExplanation}
        action={leftAction}
        source={leftSource}
      />
    );
    const question = getByText(leftPrompt);
    expect(question).not.toBeNull();
  });
});
