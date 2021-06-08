/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
//import WebEditImageScreen from '../src/screens/WebEditImageScreen';
import setimmediate from 'setimmediate';
import { ApplicationProvider } from '@ui-kitten/components';
import ImageScreen from '../src/screens/ImageScreen';
import { FirebaseProvider } from '../src/providers/firebaseProvider';
import * as eva from "@eva-design/eva";

const route = {key: "Edit Image-0r2q-I9JKd-9pNdBvKEiX", name: "Edit Image", params:{id: "c827a4b3-2535-4561-a6f3-7aa7ab4baeb7", pieceurl: "https://firebasestorage.googleapis.com/v0/b/mineart-f2351.appspot.com/o/test%2Fmuseum-gallery%2Ftest-20.jpg?alt=media&token=5eeac86d-d856-4b5e-8c6e-28c9b5ff46b8"}}
//const image_route = {key: "Image Details-gg1FCfD8fyIvXTA9knKkt", name: "Image Details", params:{id: "c827a4b3-2535-4561-a6f3-7aa7ab4baeb7"}};

describe('Edit Image Screen', () => {
    // describe test
    // test whether clicking on "Create" leads to editor screen
    it("create leads to editor screen", () => {
        const { getByText } = render(
            <ImageScreen route={image_route}/>
        );
        const createbutton = getByText("Create");
        expect(createbutton).not.toBeNull();
    });

    // it("renders share button", () => {
    //     expect(piece).toEqual(null)
    //     const { getByText } = render(
    //         <FirebaseProvider>
    //             <ApplicationProvider {...eva} theme={eva.light}>
    //                 <WebEditImageScreen route={route}/>
    //             </ApplicationProvider>
    //         </FirebaseProvider>
    //     );

    //     const sharebutton = getByText('Share');
    //     expect(sharebutton).not.toBeNull();
    // });

});