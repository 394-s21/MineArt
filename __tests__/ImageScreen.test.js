import 'react-native';
import React from 'react';
import { shallow,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as eva from "@eva-design/eva";
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';

import { FirebaseProvider } from "../src/providers/firebaseProvider";
import { ApplicationProvider } from "@ui-kitten/components";
import ImageScreen from '../src/screens/ImageScreen';
import {
  Animated
} from 'react-native';

const image_route = {key: "Image Details-gg1FCfD8fyIvXTA9knKkt", name: "Image Details", params:{id: "c827a4b3-2535-4561-a6f3-7aa7ab4baeb7"}};
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
    configure({adapter: new Adapter()});
    it('Image appears on Image Screen', async() => {
      const id = 'c827a4b3-2535-4561-a6f3-7aa7ab4baeb7';
      const wrapper = shallow(
        <FirebaseProvider>
            <ApplicationProvider {...eva} theme={eva.light}>
                <ImageScreen navigation={{navigate: mockedNavigate}} route={image_route}/>
            </ApplicationProvider>
        </FirebaseProvider>
      )
      expect(wrapper.containsMatchingElement(<Animated.Image/>)).toEqual(true)
    
      
    })

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

     // test whether clicking on "Create" leads to editor screen
    it("create leads to editor screen", async () => {
        const id = 'c827a4b3-2535-4561-a6f3-7aa7ab4baeb7';
        
        const { getByTestId } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <ImageScreen navigation={{navigate: mockedNavigate}} route={image_route}/>
                </ApplicationProvider>
            </FirebaseProvider>
        );
        const createbutton = await waitFor(() => getByTestId("edit-button"));
        expect(createbutton).not.toBeNull();
        
        await act(() => {
            fireEvent.press(createbutton);
        })

        expect(mockedNavigate).toHaveBeenCalledTimes(1);
        const expectedParams = { id: id, pieceURL: ""};
        expect(mockedNavigate).toHaveBeenCalledWith(
            'Edit Image',
            expectedParams
        );
    });

  });
  