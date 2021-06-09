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
  it('Should render flip card', async () => {
    const card = render(
      <Card/>
    );
    expect(card).not.toBeNull();
  });

  it('Should render text correctly', async () => {
    const { getByText } = render(
      <Card
        question={leftPrompt}
        explanation={leftExplanation}
        action={leftAction}
        source={leftSource}
      />
    );
    const flipCard = getByText(leftPrompt);
    expect(flipCard).not.toBeNull();
  });

  it('Should render text correctly after flip', async () => {
    const { getByText } = render(
      <Card
        question={leftPrompt}
        explanation={leftExplanation}
        action={leftAction}
        source={leftSource}
      />
    );
    const flipCard = getByText(leftPrompt);
    fireEvent.press(flipCard);
    const flipCardFlipped = getByText(leftExplanation);
    expect(flipCardFlipped).not.toBeNull();
  });

});
