import 'react-native';
import React from 'react';
import * as eva from "@eva-design/eva";
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import MuseumGalleryScreen from '../src/screens/MuseumGalleryScreen';
import { FirebaseProvider } from "../src/providers/firebaseProvider";
import { ApplicationProvider } from "@ui-kitten/components";

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
    })
  };
});

// Describing a test suite
describe('<MuseumGalleryScreen />', () => {
  beforeEach(() => {
    // Alternatively, set "clearMocks" in your Jest config to "true"
    mockedNavigate.mockClear();
  });

    it('ImageTile appears on Museum gallery screen', async () => {
        const { getAllByTestId } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <MuseumGalleryScreen />
                </ApplicationProvider>
            </FirebaseProvider>
        );

        const imageTiles = await waitFor(() => getAllByTestId('image-tile'));
        expect(imageTiles.length).toBeGreaterThan(0);
    });

  });
  