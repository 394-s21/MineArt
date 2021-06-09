import 'react-native';
import React from 'react';
import * as eva from "@eva-design/eva";
import { render, waitFor } from '@testing-library/react-native';
import AboutScreen from '../src/screens/AboutScreen';
import { FirebaseProvider } from "../src/providers/firebaseProvider";
import { ApplicationProvider } from "@ui-kitten/components";

global.XMLHttpRequest = require('xhr2');

// Describing a test suite
describe('<AboutScreen />', () => {

    it('About text appears on About page', async () => {
        const { getAllByText } = render(
            <FirebaseProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <AboutScreen />
                </ApplicationProvider>
            </FirebaseProvider>
        );

        const texts = [
          "Learning in museums has increasingly come to be characterized in terms of participatory and active engagement on the part of visitors. Here, we present a design prototype for an online interactive art museum exhibit called MineArt, an exhibit that allows visitors to create art pieces through modifications of famous artworks. It also has flip cards containing art-related knowledge and a gallery for sharing and community building. In this work we hope to facilitate the meaning-making process of art through creating exhibits that incorporate audience participation and active prolonged engagement. We hope to empower visitors by promoting their art appreciation, interpretation, and discussion in a fun and engaging manner.",
          "What is MineArt?",
          "Meet the Team"
        ]

        texts.forEach(text => {
          const matchingElems = getAllByText(text);
          expect(matchingElems).toHaveLength(1);
        })
    });

    jest.setTimeout(10000);
    it('Team profile pics appear on About page', async () => {
      const { findAllByTestId } = render(
          <FirebaseProvider>
              <ApplicationProvider {...eva} theme={eva.light}>
                  <AboutScreen />
              </ApplicationProvider>
          </FirebaseProvider>
      );

      const profilePics = await findAllByTestId("profile-pic");
      expect(profilePics.length).toBeGreaterThan(0);
    });
  });
  