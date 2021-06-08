import 'react-native';
import React from 'react';
import * as eva from "@eva-design/eva";
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';

import { FirebaseProvider } from "../src/providers/firebaseProvider";
import { ApplicationProvider } from "@ui-kitten/components";
import ImageScreen from '../src/screens/ImageScreen';

global.XMLHttpRequest = require('xhr2');
const mockedNavigate = jest.fn();

// Mocks like this need to be configured at the top level
// of the test file, they can't be setup inside your tests.
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      dispatch: jest.fn()
    }),
  };
});

// Describing a test suite
describe('<ImageScreen />', () => {
  beforeEach(() => {
    // Alternatively, set "clearMocks" in your Jest config to "true"
    mockedNavigate.mockClear();
  });

    it('Clicking on view creations brings opens social gallery n', async () => {
      const id = '07587c49-abdf-4e89-b2c5-9d2b5409c1a3'
        const { getByText, getByTestId } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <ImageScreen navigation = {{navigate: mockedNavigate}} route = {{params:{id}}} />
                </ApplicationProvider>
            </FirebaseProvider>
        );

        const viewCreationsButton = await waitFor(() => getByTestId("view-creations"))

        await act(() => {
          fireEvent.press(viewCreationsButton);
        }) 
        expect(mockedNavigate).toHaveBeenCalledTimes(1);
        const expectedParams = { id };
        expect(mockedNavigate).toHaveBeenCalledWith(
          'Social Gallery',
          expectedParams
        );
    });

  });
  