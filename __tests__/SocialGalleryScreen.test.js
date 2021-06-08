import 'react-native';
import React from 'react';
import * as eva from "@eva-design/eva";
import { render, waitFor } from '@testing-library/react-native';
import SocialGalleryScreen from '../src/screens/SocialGalleryScreen';
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
describe('<SocialGalleryScreen />', () => {

    it('Gallery does not appear on Social gallery screen without images', async () => {
        const { getAllByText } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <SocialGalleryScreen
                        route={{params:{id: '07587c49-abdf-4e89-b2c5-9d2b5409c1a3'}}}
                    />
                </ApplicationProvider>
            </FirebaseProvider>
        );

        const texts = getAllByText('No Images to Display');
        expect(texts).toHaveLength(1);
    });

    it('ImageTile appears on Social gallery screen', async () => {
        const { getAllByTestId } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <SocialGalleryScreen
                        route={{params:{id: 'c827a4b3-2535-4561-a6f3-7aa7ab4baeb7'}}}
                    />
                </ApplicationProvider>
            </FirebaseProvider>
        );

        const imageTiles = await waitFor(() => getAllByTestId('image-tile'));
        expect(imageTiles.length).toBeGreaterThan(0);
    });
    
    // creator names appear on the screen
    it('Creator names appear', async () => {
        //jest.setTimeout(100000);
        const { getAllByTestId } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <SocialGalleryScreen
                        route={{params:{id: 'c827a4b3-2535-4561-a6f3-7aa7ab4baeb7'}}}
                    />
                </ApplicationProvider>
            </FirebaseProvider>
        );  
        
        const creatorNames = await waitFor(() => getAllByTestId('creator-text'));
        expect(creatorNames.length).toBeGreaterThan(0);
    })
  });
  