import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ImageTile from '../src/components/ImageTile';
import UserImageDetailScreen from '../src/screens/UserImageDetailScreen';

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
describe('<ImageTile />', () => {
  beforeEach(() => {
    // Alternatively, set "clearMocks" in your Jest config to "true"
    mockedNavigate.mockClear();
  });

  it('Clicking on image should open detail view with correct user and description', async () => {
    const testId = 'helloworld';
    const id = 1;
    const testImageUrl =
      'https://images.metmuseum.org/CRDImages/ep/original/DT49.jpg';
    const { getByTestId } = render(
      <ImageTile
        testID={testId}
        id={id}
        imageUrl={testImageUrl}
        navigateUserImageDetail={true}
      />
    );
    const imageTileObj = getByTestId(testId);
    fireEvent.press(imageTileObj);
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    const expectedParams = { id: id, imageUrl: testImageUrl, user: null };
    expect(mockedNavigate).toHaveBeenCalledWith(
      'User Image Details',
      expectedParams
    );
  });
});
